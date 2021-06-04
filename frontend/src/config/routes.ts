import { ILeftsideBarLinks } from '@components/dashboard/left-sidebar'
export const LEFT_SIDEBAR_LINKS: ILeftsideBarLinks[] = [
  { name: `Profile`, icon: `fas fa-user fa-lg`, route: `/dashboard` },
  {
    name: `Organization`,
    icon: `fas fa-play fa-lg`,
    route: `/dashboard/organizations`,
  },
]

export const AUTH_ROUTES = [`/dashboard`]
