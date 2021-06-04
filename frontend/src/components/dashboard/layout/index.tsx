import { LeftSideBar } from '../left-sidebar'
import { SideBarTop } from '@components/tail-kit/navigation/sidebar/SidebarTop'
import { Button } from '@components/tail-kit/elements/buttons/Button'
import { DOCUMENT } from '@config'
import { useState } from 'react'

interface IDashBoardLayoutProps {
  children?: React.ReactNode
}
export const DashBoardLayout: React.FC<IDashBoardLayoutProps> = (props) => {
  const [openMenu, setOpenMenu] = useState(false)

  const buttonIcon = (openMenu: boolean) => {
    return openMenu ? (
      <i className="fal fa-bars fa-lg "></i>
    ) : (
      <i className="fad fa-arrow-from-right fa-lg"></i>
    )
  }

  return (
    <>
      <SideBarTop imgSrc={DOCUMENT.logo}>
        <Button
          color="gray"
          icon={buttonIcon(openMenu)}
          onClick={() => setOpenMenu(!openMenu)}
        ></Button>
      </SideBarTop>
      <div className="flex h-screen">
        <LeftSideBar isVisible={openMenu} />
        <div className="w-full relative overflow-hidden bg-gray-100">
          {props.children}
        </div>
      </div>
    </>
  )
}
