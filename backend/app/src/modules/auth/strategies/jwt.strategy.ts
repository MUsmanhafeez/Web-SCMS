import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifiedCallback } from 'passport-jwt'
import { OIDC_BASE_JWT_STRATEGY_CONFIG, OIDC_URI } from '../../../config'
import { AuthService } from '../auth.service'
import { passportJwtSecret } from 'jwks-rsa'
import { Uuid } from '@lib/graphql'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      ...OIDC_BASE_JWT_STRATEGY_CONFIG,
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `${OIDC_URI}/jwks`
      })
    })
  }

  async validate(payload: any, done: VerifiedCallback) {
    if (!payload || !payload.sub)
      return done(
        new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED),
        false
      )
    const userId = new Uuid(payload.sub)
    const user = await this.authService.validateUser(userId)
    if (!user)
      return done(
        new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED),
        false
      )
    return done(null, user, payload.iat)
  }
}
