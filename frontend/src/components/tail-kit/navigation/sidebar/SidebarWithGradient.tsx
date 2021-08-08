import { Avatar } from '@components/tail-kit/elements/avatars/Avatar'
import { SmallScrollBar } from './SidebarWithGradientStyle'
interface SiderbarWithGradientProps {
  hidden?: boolean | true
  children?: React.ReactNode
  userInfo: string
  signout?: () => void
}
export const SidebarWithGradient: React.FC<SiderbarWithGradientProps> = (
  props,
) => {
  return (
    <div
      className={`h-screen ${
        props.hidden ? `hidden` : ``
      } md:block py-4 shadow-lg relative inset-y-0 left-0 w-64`}
    >
      <div className="flex flex-col bg-gray-300 h-full rounded-2xl dark:bg-gray-700">
        <div className="flex py-6 items-center border-b-2 pb-5 pt-3 ml-3 ">
          <Avatar
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QTESaLQXNJDpokdt6XZd3CmvIevt1VKmGQ&usqp=CAU"
            size="small"
            withBorder={true}
          />
          <span className="capitalize pl-3 flex-initial text-gray-700   text-xl md:text-base font-bold ">
            {props.userInfo}
          </span>
          <br />
        </div>
        <SmallScrollBar className="flex-1 py-1 mb-14">
          {props.children}
        </SmallScrollBar>
        {props.signout && (
          <div
            className=" absolute bottom-8 inset-x-0 text-center h-6 cursor-pointer"
            onClick={props.signout}
          >
            <span className="transition duration-400 ease-in-out hover:text-red-500 text-gray-700 font-bold">
              <i className="fas fa-power-off fill-current px-1"></i>
              Signout
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
