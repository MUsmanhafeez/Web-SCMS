import Link from 'next/link'
import React from 'react'

export interface IHeaderProps {
  title: string
  icon?: string

  parentTitle?: string
  children?: React.ReactNode
}
export const Header: React.FC<IHeaderProps> = (props): React.ReactElement => {
  return (
    <div className="inset-y-0 right-0 max-h-full overflow-auto w-full bg-gray-100">
      <div className="flex grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 bg-gray-400">
        <div
          className={`flex items-center text-lg gap-4 m-5 col-span-2 text-white`}
        >
          {props.icon && <i className={props.icon} />}
          {props.parentTitle && (
            <>
              <Link href="/dashboard/media">
                <a>
                  <span className="text-primary font-bold">
                    {props.parentTitle}
                  </span>
                </a>
              </Link>
              <i className="fas fa-chevron-right" />
            </>
          )}
          <p className="text-xl font-bold">{props.title}</p>
        </div>
        {props.children && (
          <div className={`m-5 place-items-end col-span-3`}>
            {props.children}
          </div>
        )}
      </div>
    </div>
  )
}
