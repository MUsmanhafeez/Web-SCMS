import { ExtractJwt, StrategyOptions } from 'passport-jwt'
import {
  OidcInteraction,
  OidcInteractionPromptNames
} from 'src/modules/auth/oidc/utils/type'
import { ASP_FRONTEND_APP_URI, ASP_BACKEND_APP_URI, IS_DEV } from '.'

// OIDC General + Client config starts here

export const OIDC_SUBPATH = process.env.OIDC_SUBPATH || `oidc`
export const OIDC_URI = `${ASP_BACKEND_APP_URI}/${OIDC_SUBPATH}`
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID
const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET
const OIDC_CLIENT_REDIRECT_URIS: string[] = process.env
  .OIDC_CLIENT_REDIRECT_URIS
  ? JSON.parse(process.env.OIDC_CLIENT_REDIRECT_URIS)
  : [`${ASP_FRONTEND_APP_URI}/auth/callback`]

export const OIDC_BASE_JWT_STRATEGY_CONFIG: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  audience: ASP_BACKEND_APP_URI,
  issuer: OIDC_URI,
  algorithms: [`RS256`]
}

// OIDC Provider config starts from here

export const OIDC_PROVIDER_RESOURCES: string[] = process.env
  .OIDC_PROVIDER_RESOURCES
  ? JSON.parse(process.env.OIDC_PROVIDER_RESOURCES)
  : [ASP_BACKEND_APP_URI]
const OIDC_COOKIE_SECRETS = JSON.parse(process.env.OIDC_COOKIE_SECRETS)

const oidcInteractionUrls = {
  [OidcInteractionPromptNames.LOGIN]: `${ASP_FRONTEND_APP_URI}/login?Iuid=$Iuid`,
  [OidcInteractionPromptNames.CONSENT]: `${OIDC_URI}/interaction/$Iuid/confirm`
}

export const OIDC_BASE_CONFIG = {
  clients: [
    {
      client_id: OIDC_CLIENT_ID,
      client_secret: OIDC_CLIENT_SECRET,
      application_type: `web`,
      grant_types: [`refresh_token`, `authorization_code`],
      redirect_uris: OIDC_CLIENT_REDIRECT_URIS,
      response_types: [`code`],
      token_endpoint_auth_method: `none`
    }
  ],
  clientDefaults: {
    grant_types: [`authorization_code`, `refresh_token`],
    scope: `openid offline_access`
  },
  pkce: { supportedMethods: [`S256`] },
  interactions: {
    url: (ctx, interaction: OidcInteraction): string => {
      return oidcInteractionUrls[interaction.prompt.name].replace(
        `$Iuid`,
        interaction.uid
      )
    }
  },
  cookies: {
    long: { signed: true, maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 day in ms
    short: { signed: true },
    keys: OIDC_COOKIE_SECRETS
  },
  formats: {
    AccessToken: `jwt`,
    ClientCredentials: `jwt`
  },
  issueRefreshToken: (ctx, client, code) => {
    return (
      client.grantTypeAllowed(`refresh_token`) &&
      code.scopes.has(`offline_access`)
    )
  },
  claims: {
    email: [`email`, `email_verified`],
    profile: [`name`, `nickname`],
    openid: [`sub`, `aud`]
  },
  features: {
    devInteractions: { enabled: false }, // defaults to true
    // deviceFlow: { enabled: true }, // defaults to false
    // revocation: { enabled: true } // defaults to false
    jwtUserinfo: { enabled: true },
    encryption: { enabled: true }
  },
  scopes: [`openid`, `offline_access`],
  jwks: {
    // TODO: rotate these keys
    keys: [
      {
        d: `VEZOsY07JTFzGTqv6cC2Y32vsfChind2I_TTuvV225_-0zrSej3XLRg8iE_u0-3GSgiGi4WImmTwmEgLo4Qp3uEcxCYbt4NMJC7fwT2i3dfRZjtZ4yJwFl0SIj8TgfQ8ptwZbFZUlcHGXZIr4nL8GXyQT0CK8wy4COfmymHrrUoyfZA154ql_OsoiupSUCRcKVvZj2JHL2KILsq_sh_l7g2dqAN8D7jYfJ58MkqlknBMa2-zi5I0-1JUOwztVNml_zGrp27UbEU60RqV3GHjoqwI6m01U7K0a8Q_SQAKYGqgepbAYOA-P4_TLl5KC4-WWBZu_rVfwgSENwWNEhw8oQ`,
        dp: `E1Y-SN4bQqX7kP-bNgZ_gEv-pixJ5F_EGocHKfS56jtzRqQdTurrk4jIVpI-ZITA88lWAHxjD-OaoJUh9Jupd_lwD5Si80PyVxOMI2xaGQiF0lbKJfD38Sh8frRpgelZVaK_gm834B6SLfxKdNsP04DsJqGKktODF_fZeaGFPH0`,
        dq: `F90JPxevQYOlAgEH0TUt1-3_hyxY6cfPRU2HQBaahyWrtCWpaOzenKZnvGFZdg-BuLVKjCchq3G_70OLE-XDP_ol0UTJmDTT-WyuJQdEMpt_WFF9yJGoeIu8yohfeLatU-67ukjghJ0s9CBzNE_LrGEV6Cup3FXywpSYZAV3iqc`,
        e: `AQAB`,
        kty: `RSA`,
        n: `xwQ72P9z9OYshiQ-ntDYaPnnfwG6u9JAdLMZ5o0dmjlcyrvwQRdoFIKPnO65Q8mh6F_LDSxjxa2Yzo_wdjhbPZLjfUJXgCzm54cClXzT5twzo7lzoAfaJlkTsoZc2HFWqmcri0BuzmTFLZx2Q7wYBm0pXHmQKF0V-C1O6NWfd4mfBhbM-I1tHYSpAMgarSm22WDMDx-WWI7TEzy2QhaBVaENW9BKaKkJklocAZCxk18WhR0fckIGiWiSM5FcU1PY2jfGsTmX505Ub7P5Dz75Ygqrutd5tFrcqyPAtPTFDk8X1InxkkUwpP3nFU5o50DGhwQolGYKPGtQ-ZtmbOfcWQ`,
        p: `5wC6nY6Ev5FqcLPCqn9fC6R9KUuBej6NaAVOKW7GXiOJAq2WrileGKfMc9kIny20zW3uWkRLm-O-3Yzze1zFpxmqvsvCxZ5ERVZ6leiNXSu3tez71ZZwp0O9gys4knjrI-9w46l_vFuRtjL6XEeFfHEZFaNJpz-lcnb3w0okrbM`,
        q: `3I1qeEDslZFB8iNfpKAdWtz_Wzm6-jayT_V6aIvhvMj5mnU-Xpj75zLPQSGa9wunMlOoZW9w1wDO1FVuDhwzeOJaTm-Ds0MezeC4U6nVGyyDHb4CUA3ml2tzt4yLrqGYMT7XbADSvuWYADHw79OFjEi4T3s3tJymhaBvy1ulv8M`,
        qi: `wSbXte9PcPtr788e713KHQ4waE26CzoXx-JNOgN0iqJMN6C4_XJEX-cSvCZDf4rh7xpXN6SGLVd5ibIyDJi7bbi5EQ5AXjazPbLBjRthcGXsIuZ3AtQyR0CEWNSdM7EyM5TRdyZQ9kftfz9nI03guW3iKKASETqX2vh0Z8XRjyU`,
        use: `sig`
      },
      {
        crv: `P-256`,
        d: `K9xfPv773dZR22TVUB80xouzdF7qCg5cWjPjkHyv7Ws`,
        kty: `EC`,
        use: `sig`,
        x: `FWZ9rSkLt6Dx9E3pxLybhdM6xgR5obGsj5_pqmnz5J4`,
        y: `_n8G69C-A2Xl4xUW2lF0i8ZGZnk_KPYrhv4GbTGu5G4`
      }
    ]
  },
  ttl: {
    AccessToken: (IS_DEV ? 30 * 24 : 1) * 60 * 60, // 60 minutes in seconds if development then it will for month
    AuthorizationCode: 10 * 60, // 10 minutes in seconds
    IdToken: 1 * 60 * 60, // 1 hour in seconds
    DeviceCode: 10 * 60, // 10 minutes in seconds
    RefreshToken: 30 * 24 * 60 * 60 // 30 day in seconds
  },
  renderError: (ctx, out, error) => {
    console.error(`Oidc Error`, error)
    ctx.type = `html`
    ctx.body = `<!DOCTYPE html>
    <head>
      <title>oops! something went wrong</title>
      <style>/* css and html classes omitted for brevity, see lib/helpers/defaults.js */</style>
    </head>
    <body>
      <div>
        <h1>oops! something went wrong</h1>
        ${Object.entries(out)
          .map(([key, value]) => `<pre><strong>${key}</strong>: ${value}</pre>`)
          .join(``)}
      </div>
    </body>
    </html>`
  }
}
