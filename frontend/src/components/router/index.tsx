import { AUTH_ROUTES } from '@config'
import { useAuth } from 'oidc-react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

interface IRouterProps {
  children: React.ReactNode
}

export const Router: FC<IRouterProps> = (props: IRouterProps) => {
  const { children } = props
  const auth = useAuth()
  const router = useRouter()
  const { t } = useTranslation(`common`)

  if (auth.isLoading) return <div>{t(`please-wait`)}...</div>

  const isLoggedIn = auth && auth.userData
  const isAuthRoute = AUTH_ROUTES.reduce((isAuthRoute, authRoute) => {
    if (authRoute === router.pathname.substr(0, authRoute.length)) return true
    return isAuthRoute
  }, false)

  if (process.browser) {
    if (!isLoggedIn && isAuthRoute) {
      router.push(`/`)
    } else if (isLoggedIn && !isAuthRoute) {
      router.push(`/dashboard`)
    }
  }

  return <>{children}</>
}
