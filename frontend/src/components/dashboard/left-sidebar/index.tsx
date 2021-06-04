import { SidebarLink } from '@components/tail-kit/navigation/sidebar/SidebarLink'
import { SidebarWithGradient } from '@components/tail-kit/navigation/sidebar/SidebarWithGradient'
import { LEFT_SIDEBAR_LINKS } from '@config'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from 'oidc-react'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'

interface LeftSideBarProps {
  isVisible?: boolean | true
}
export interface ILeftsideBarLinks {
  name: string
  icon: string
  route: string
}

export const LeftSideBar: React.FC<LeftSideBarProps> = (props) => {
  const auth = useAuth()
  const router = useRouter()
  const [activeLinkName, setActiveLinkName] = useState(``)
  const userName = useSelector(
    ({
      user: {
        user: { firstName, lastName },
      },
    }: RootState) => firstName + ` ` + lastName,
  )

  useEffect(() => {
    const currentRouteLinkName: string =
      LEFT_SIDEBAR_LINKS.find(
        (link: ILeftsideBarLinks) => link.route === router.pathname,
      )?.name || ``
    setActiveLinkName(currentRouteLinkName)
  }, [])
  return (
    <SidebarWithGradient
      hidden={props.isVisible}
      signout={() => auth.signOut()}
      userInfo={userName}
    >
      {LEFT_SIDEBAR_LINKS.map((link: ILeftsideBarLinks, index: number) => (
        <SidebarLink
          key={index}
          setActive={() => setActiveLinkName(link.name)}
          className={
            activeLinkName == link.name
              ? `text-blue-500 bg-gradient-to-r from-white to-blue-100 border-r-4 border-blue-500`
              : `text-gray-500`
          }
          icon={link.icon}
          title={link.name}
          route={link.route}
        />
      ))}
    </SidebarWithGradient>
  )
}
