import React, { FC } from 'react'
import { DropDownMenu } from '@tailkit/elements/ddm/DropDownMenu'
import Link from 'next/link'
import { DOCUMENT } from '@config'
import {
  allOrganization_allOrganization,
  OrganizationPostType,
} from '@gqlTypes/asp'
import { useDispatch } from 'react-redux'
import { setActiveOrganizationid } from '@redux/actions'

export interface IMediaFolderCardProps {
  item: allOrganization_allOrganization
}
export const dropdownMenuItems = [
  { icon: <i className="fad fa-trash mr-3" />, label: `Edit` },
  { icon: <i className="fad fa-share mr-3" />, label: `Share` },
  { icon: <i className="fad fa-trash mr-3" />, label: `Delete` },
]

export const MediaFolderCard: FC<IMediaFolderCardProps> = ({ item }) => {
  const dispatch = useDispatch()
  const handleActiveClick = () => {
    dispatch(setActiveOrganizationid(item.id))
  }
  return (
    <div
      className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-gray-300 "
      style={{ backgroundImage: DOCUMENT.bg1 }}
    >
      <Link href={`/dashboard/organizations/${item.type.toLocaleLowerCase()}`}>
        <div
          className="relative w-full width-max-contain block h-full"
          onClick={handleActiveClick}
        >
          <div className=" dark:bg-gray-500 w-full p-1 rounded-lg">
            <div className="bg-white flex grid  grid-cols-5 gap-4">
              <div className="col-span-4 flex items-center">
                <p className="col-span-100 text-gray-800 dark:text-white overflow-hidden pt-1 pl-2 text-2xl  width: 100% h-10">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {item.name}
                </p>
              </div>
              <div className=" flex items-center">
                <p className="col-span-50 text-gray-800 dark:text-white text-xs ">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {new Date(item.createdAt).toLocaleDateString(`en-US`)}
                </p>
              </div>

              <div className="col-span-4 flex items-center ">
                <p className="col-span-100 text-gray-800 dark:text-white overflow-hidden font-medium width: 100%  pl-2 pb-2">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {item.desc}
                </p>
              </div>
              <div className="col-span-3  flex items-center">
                <p className="flex col-span-50 dark:text-white  font-medium pl-2 width: 100% float: left text-blue-500 mb-5">
                  {/* {item.icon && <i className={item.icon} />} */}
                  <img
                    className="h-5 w-5 mr-2 mt-0.5"
                    src={DOCUMENT.call_logo}
                  ></img>
                  <span className="">{item.phone}</span>
                </p>
              </div>

              <div className="col-span-2 flex items-center">
                <p className="flex items-center col-span-50 text-gray-800 dark:text-white text-xs ml-5 mb-5">
                  {item.type === OrganizationPostType.MASJID && (
                    <span>Total Ammount= {item?.totalAmount || 0}</span>
                  )}
                  {` `}
                </p>
              </div>
              {/* <div
                className="text-center"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <DropDownMenu
                  icon={<i className="fal fa-ellipsis-v fa-2x"></i>}
                  items={dropdownMenuItems}
                ></DropDownMenu>
              </div> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
