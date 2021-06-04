import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit
} from '@nestjs/common'
import { Provider } from 'oidc-provider'
import {
  ASP_BACKEND_APP_URI,
  OIDC_BASE_CONFIG,
  OIDC_PROVIDER_RESOURCES,
  OIDC_URI
} from 'src/config'
import { OidcInteraction, OidcInteractionPromptNames } from './utils/type'
import { Repository } from 'typeorm'
import { epochTime } from 'src/utils/time'
import RedisAdapterForOIDC from './utils/RedisAdapterForOIDC'
import { User } from 'src/entities/postgres/User'
import { Uuid } from '@lib/graphql'
import { UserService } from 'src/modules/user/user.service'
@Injectable()
export class OidcService implements OnModuleInit {
  oidc: Provider
  oidcCallback = null

  constructor(private readonly usersService: UserService) {}

  onModuleInit() {
    const oidcConfig = {
      ...OIDC_BASE_CONFIG,
      adapter: RedisAdapterForOIDC,
      features: {
        ...OIDC_BASE_CONFIG.features,
        resourceIndicators: {
          enabled: true,
          defaultResource: this.oidcDefaultResource,
          getResourceServerInfo: (ctx, resourceIndicator, client) =>
            this.oidcGetResourceServerInfo(resourceIndicator)
        }
      },
      findAccount: (ctx, id) => this.findOidcAccount(id)
    }
    this.oidc = new Provider(OIDC_URI, oidcConfig)
    this.oidcCallback = this.oidc.callback()
  }

  private oidcDefaultResource = (ctx, client, oneOf) => oneOf
  private oidcGetResourceServerInfo(resourceIndicator) {
    if (OIDC_PROVIDER_RESOURCES.includes(resourceIndicator) === false)
      throw new HttpException(`Invalid resource`, HttpStatus.BAD_REQUEST)
    return {
      scope: this.getResourceScopes(resourceIndicator),
      audience: ASP_BACKEND_APP_URI,
      accessTokenFormat: `jwt`,
      jwt: {
        sign: { alg: `RS256` }
      }
    }
  }

  private getResourceScopes(resourceIndicator: string) {
    return `openid offline_access asp:profile asp:email emz:all`
  }

  private async findOidcAccount(id: string) {
    const user: User = await this.usersService.getUser({ id: new Uuid(id) })
    if (!user)
      throw new HttpException(`User account not found`, HttpStatus.NOT_FOUND)

    const userId = user.id.uuid
    const fullName = `${user.firstName} ${user.lastName}`
    const result = {
      displayName: fullName,
      accountId: userId,
      claims: () => ({
        sub: userId, // it is essential to always return a sub claim
        email: user.email,
        email_verified: false, // TODO: Add email verifing boolean
        name: fullName,
        nickname: user.firstName,
        updated_at: epochTime(user.updatedAt)
      })
    }
    return result
  }

  async setInteractionGrant(oidcInteraction: OidcInteraction) {
    const {
      prompt: { name, details },
      params,
      session: { accountId },
      jti
    } = oidcInteraction

    if (oidcInteraction.prompt.name !== OidcInteractionPromptNames.CONSENT)
      throw new Error(`Session expired.`)

    const { grantId } = oidcInteraction
    let grant

    if (grantId) {
      // we'll be modifying existing grant in existing session
      grant = await this.oidc.Grant.find(grantId)
    } else {
      // we're establishing a new grant
      grant = new this.oidc.Grant({
        accountId,
        clientId: params.client_id
      })
    }

    if (details.missingOIDCScope) {
      grant.addOIDCScope(details.missingOIDCScope.join(` `))
    }
    if (details.missingOIDCClaims) {
      grant.addOIDCClaims(details.missingOIDCClaims)
    }

    if (details.missingResourceScopes) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [indicator, scopes] of Object.entries(
        details.missingResourceScopes
      )) {
        grant.addResourceScope(indicator, (scopes as string[]).join(` `))
      }
    }

    const newGrantId = await grant.save()
    const consent: { grantId?: string } = {}
    if (!oidcInteraction.grantId) {
      // we don't have to pass grantId to consent, we're just modifying existing one
      consent.grantId = newGrantId
    }

    const result = { consent }
    return result
  }
}
