import { UserProfileForm } from '@components/forms/user-profile-form'
import { DashBoardLayout } from '@components/dashboard/layout'

import { FC } from 'react'
import { LoginForm } from '@components/forms/login-form'

const Dashboard: FC = () => {
  return (
    <DashBoardLayout>
      <section className="pt-10 h-screen bg-gray-100 bg-opacity-80">
        <div className=" container max-w-2xl mx-auto shadow-md md:w-3/4">
          <UserProfileForm />
        </div>
      </section>
    </DashBoardLayout>
  )
}
export default Dashboard
