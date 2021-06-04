import { RegisterForm } from '@components/forms/register-form'
import { useRouter } from 'next/router'
import { parseUrlQueryParam } from '@utils/browser'
import { FC } from 'react'
import { oidcSignIn } from '@utils/auth'

const RegisterPage: FC = () => {
  const router = useRouter()
  const oidcInteractionUid = parseUrlQueryParam(router, `Iuid`)
  if (process.browser && !oidcInteractionUid) oidcSignIn()

  if (!oidcInteractionUid) {
    router.push(`/404`)
  }
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <RegisterForm oidcInteractionUid={oidcInteractionUid} />
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src="images/backgrounds/lamp.jpg"
        />
      </div>
    </div>
  )
}
export default RegisterPage
