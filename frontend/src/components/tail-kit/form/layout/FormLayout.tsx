import { Avatar } from '@components/tail-kit/elements/avatars/Avatar'
import React, { FC } from 'react'

interface FormLayoutProps {
  children: JSX.Element[] | JSX.Element
  imgSrc?: string
  title: string
}
export const FormLayout: FC<FormLayoutProps> = (props) => {
  return (
    <div>
      <div className="p-4 bg-gray-500 border-t-2 border-indigo-500 rounded-lg ">
        <div className="max-w-sm mx-auto md:w-full md:mx-0">
          <div className="inline-flex items-center space-x-4">
            <Avatar
              size="x-small"
              img={`${props.imgSrc ? props.imgSrc : ``}`}
            />
            <h1 className="text-white text-xl font-bold">{props.title}</h1>
          </div>
        </div>
      </div>
      <div className="space-y-6 bg-gray-200 ">{props.children}</div>
    </div>
  )
}
