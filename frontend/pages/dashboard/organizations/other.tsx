import { DashBoardLayout } from '@components/dashboard/layout'
import { OthersForm } from '@components/forms/organization/OthersForms'

const OthersScreen = () => {
  return (
    <DashBoardLayout>
      <section className="pt-10 h-screen bg-gray-100 bg-opacity-80 overflow-auto">
        <div className=" container max-w-2xl mx-auto shadow-md md:w-3/4 ">
          <OthersForm />
        </div>
      </section>
    </DashBoardLayout>
  )
}

export default OthersScreen
