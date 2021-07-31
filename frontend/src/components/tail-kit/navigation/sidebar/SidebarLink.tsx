import Link from 'next/link'
import { FC } from 'react'
interface SidebarLinkProps {
  icon: string
  title: string
  route: string
  setActive: () => void
  className?: string
}
export const SidebarLink: FC<SidebarLinkProps> = (props) => {
  return (
    <Link href={props.route}>
      <a
        className={`w-full font-thin uppercase flex items-center py-4 px-6 my-2 transition-colors duration-200 justify-start overflow-hidden ${props.className}`}
        onClick={props.setActive}
      >
        <span className="text-left">
          <i className={props.icon}></i>
        </span>
        <span className="mx-6 text-xs font-normal capitalize">
          {props.title}
        </span>
      </a>
    </Link>
  )
}
