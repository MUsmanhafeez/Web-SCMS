import React, { useState } from 'react'
import { DropDownMenu } from '@tailkit/elements/ddm/DropDownMenu'
import { Avatar } from '@components/tail-kit/elements/avatars/Avatar'
import useTranslation from 'next-translate/useTranslation'

export interface ITemplateUser {
  image: string
  name: string
  lastUpdatedTime: string
  desc: string
  phone: string
}
export const dropdownMenuItems = [
  { icon: <i className="fad fa-trash mr-3" />, label: `Delete` },
  { icon: <i className="fad fa-edit mr-3" />, label: `Edit` },
  { icon: <i className="fal fa-sign-out mr-3" />, label: `Move` },
  { icon: <i className="fad fa-compress-alt mr-3" />, label: `Replace` },
  { icon: <i className="fal fa-file-alt mr-3" />, label: `Description` },
]

export const MediaFileCard = ({ item }) => {
  const { t } = useTranslation(`media`)

  const [overLay, setOverLay] = useState(`hidden`)
  const [showName, setShowName] = useState(`hidden`)
  return (
    <div className="overflow-visible shadow-lg rounded-lg h-full w-full cursor-pointer m-auto bg-white">
      <div className="relative max-w-full block max-h-full">
        <div
          className="relative"
          onMouseEnter={() => {
            setOverLay(`block`)
          }}
          onMouseLeave={() => {
            setOverLay(`hidden`)
          }}
        >
          <img
            alt="blog photo"
            src={item.image}
            className="rounded-t-lg h-40 max-h-40 w-full object-contain bg-gray-300 m-auto "
          />
          <div
            className={`rounded-t-lg max-h-40 absolute inset-0 w-full bg-opacity-40 bg-black ${overLay}`}
          >
            <div className="flex grid grid-cols-3">
              <div className="m-3 col-span-2 pt-1">
                <input
                  className="h-5 w-5 rounded-lg cursor-pointer checked:bg-pink-500"
                  type="checkbox"
                />
              </div>
              <div className="flex m-3 col">
                <div className="border-r-2">
                  <i className="fas fa-link text-white mr-2"></i>
                  <i className="fas fa-info-circle text-white mr-2"></i>
                </div>
                <div className="ml-1">
                  <DropDownMenu
                    icon={<i className="fas fa-ellipsis-v text-white"></i>}
                    items={dropdownMenuItems}
                  ></DropDownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-white dark:bg-gray-800 w-full p-4 rounded-b-lg grid grid-cols-4">
          <div className="col-span-3">
            <div className="mb-2 items-center">
              <p className="text-gray-800 dark:text-white text-xl font-medium">
                {item.title}
              </p>
            </div>

            {item.tag && (
              <div className="text-xs text-gray-400 ">
                {t(`tag`)}: {item.tag}
              </div>
            )}
            {item.lastUsed && (
              <div className="items-center mt-2">
                <p className="text-gray-400 text-xs dark:text-gray-300">
                  {t(`last-used`)}: {item.lastUsed}
                </p>
              </div>
            )}
            {item.desc && (
              <div className="items-center mt-2">
                <p className="text-gray-400 text-xs dark:text-gray-300">
                  {t(`last-used`)}: {item.desc}
                </p>
              </div>
            )}
          </div>
          <div className="col-span-1 self-center relative">
            {item.user && (
              <>
                <div
                  onMouseEnter={() => {
                    setShowName(`block`)
                  }}
                  onMouseLeave={() => {
                    setShowName(`hidden`)
                  }}
                >
                  <Avatar size="x-small" img={item.user.image} />
                </div>
                <div
                  className={`absolute bg-gray-700 py-1 px-3 rounded-md text-sm text-center top-7 left-2 ${showName}`}
                >
                  <p className="text-white dark:text-white">{item.user.name}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
