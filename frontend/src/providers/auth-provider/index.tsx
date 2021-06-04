import React, { FC } from 'react'
import { AuthProvider as OidcAuthProvider, useAuth } from 'oidc-react'
import { useDispatch } from 'react-redux'
import { setUser, unsetUser } from '@redux/actions'
import { ASP_BACKEND_APP_URI } from '@config'
import { useLazyQuery } from '@apollo/client'
import { GQLQ_USER } from '@entities'
import { UserManager } from '@services'
import { GqlUser } from '@gqlTypes/asp'

interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthHandler = ({ children }) => {
  const dispatch = useDispatch()
  const auth = useAuth()
  const [setUserQuery] = useLazyQuery<GqlUser>(GQLQ_USER, {
    onCompleted: ({ user }) => {
      dispatch(setUser(user))
    },
  })
  const { events } = auth.userManager

  const renewAccessToken = async () => {
    try {
      await auth.userManager.signinSilent({
        resource: ASP_BACKEND_APP_URI,
      })
    } catch (error) {
      console.error(`Error (Renewing Token):`, error)
      auth.signOut()
    }
  }

  const postLogoutHandler = () => {
    dispatch(unsetUser())
  }

  const onSilentRenewError = (error) => {
    console.error(`onSilentRenewError`, error)
    auth.signOut()
  }
  const onUserLoaded = () => setUserQuery()
  const onAccessTokenExpired = renewAccessToken
  const onAccessTokenExpiring = renewAccessToken
  const onUserUnloaded = postLogoutHandler
  const onUserSignedOut = postLogoutHandler
  const onUserSignedIn = setUserQuery

  events.addUserLoaded(onUserLoaded)
  events.addSilentRenewError(onSilentRenewError)
  events.addAccessTokenExpired(onAccessTokenExpired)
  events.addAccessTokenExpiring(onAccessTokenExpiring)
  events.addUserUnloaded(onUserUnloaded)
  events.addUserSignedOut(onUserSignedOut) // This dosent work (make them work and call store.dispatch(unsetUser()) in here)
  events.addUserSignedIn(onUserSignedIn) // TODO: [ASP-32]  This dosent work (make them work and call setUserQuery in here)
  return <>{children}</>
}

const AuthProvider: FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  if (!process.browser) return <>{children}</>
  return (
    <OidcAuthProvider userManager={UserManager} autoSignIn={false}>
      <AuthHandler>{children}</AuthHandler>
    </OidcAuthProvider>
  )
}

export { AuthProvider }
