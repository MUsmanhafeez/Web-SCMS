import { ASP_BACKEND_APP_URI } from '@config'
import { UserManager } from '@services'

export const oidcSignIn = (): Promise<void> => {
  UserManager.signinRedirect({
    resource: ASP_BACKEND_APP_URI,
    skipUserInfo: true,
    prompt: `consent`,
    extraTokenParams: {
      resource: ASP_BACKEND_APP_URI,
    },
  })
  return
}
