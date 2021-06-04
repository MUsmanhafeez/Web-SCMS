import { oidcSignIn } from '@utils/auth'
import { useAuth } from 'oidc-react'
import { Button } from '@tailkit/elements/buttons/Button'
import { FC } from 'react'

// TODO: [ASP-33] Create main page for ASP
const Index: FC = () => {
  const auth = useAuth()
  const isLoggedIn = auth && auth.userData
  if (isLoggedIn) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <strong>Logged in! 🎉</strong>
          <Button
            onClick={() => auth.signOut()}
            label="Log out!"
            color="red"
            isFat={true}
            className="max-w-xs mt-8"
          />
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Button
          onClick={oidcSignIn}
          label="Log in!"
          color="indigo"
          isFat={true}
          className="max-w-xs self-center"
        />
      </div>
    </div>
  )
}

export default Index
