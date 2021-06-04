import React, { FC } from 'react'
import { DropDownMenu } from '@tailkit/elements/ddm/DropDownMenu'
import Link from 'next/link'
import { IMediaFolderCard } from 'pages/dashboard/media'

export interface IMediaFolderCardProps {
  item: IMediaFolderCard
}
export const dropdownMenuItems = [
  { icon: <i className="fad fa-share mr-3"></i>, label: `Share` },
  { icon: <i className="fad fa-trash mr-3" />, label: `Delete` },
]

export const MediaFolderCard: FC<IMediaFolderCardProps> = ({ item }) => {
  return (
    <div className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-white ">
      <Link href={`/dashboard/media/${item.id}`}>
        <div className="relative w-full block h-full">
          <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg">
            <div className="flex grid grid-cols-5 gap-4">
              <div className="col-span-4 flex items-center">
                <p className="col-span-50 text-gray-800 dark:text-white text-xl font-medium width: 100% float: left">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {item.title}
                </p>
              </div>
              <div className="col-span-4 flex items-center">
                <p className="col-span-50 text-gray-800 dark:text-white text-xl font-medium width: 100% float: left">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {item.desc}
                </p>
              </div>
              <div className="col-span-4 flex items-center">
                <p className="col-span-50 text-gray-800 dark:text-white text-xl font-medium width: 100% float: left">
                  {/* {item.icon && <i className={item.icon} />} */}
                  {item.phone}
                </p>
              </div>
              <div
                className="text-center"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <DropDownMenu
                  icon={<i className="fal fa-ellipsis-v fa-2x"></i>}
                  items={dropdownMenuItems}
                ></DropDownMenu>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
