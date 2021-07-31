import useTranslation from 'next-translate/useTranslation'
import React from 'react'

export interface IBoxGridListProps<T> {
  header?: React.ReactNode
  newItemText?: string
  Card: React.ElementType
  list: T[]
}
export const BoxGridList = <T extends any>(
  props,
): React.ReactElement<IBoxGridListProps<T>> => {
  const { t } = useTranslation(`media`)

  return (
    <div className="inset-y-0 right-0 w-full bg-gray-100">
      {props.header}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-4 mx-5 py-5">
        {props.newItemText && (
          <div className="shadow rounded-lg md:h-full w-full h-48 cursor-pointer m-auto flex justify-center items-center text-blue-400 bg-white hover:bg-blue-300 hover:text-white">
            <span className="text-center flex items-center w-full h-full transform transition duration-300 hover:scale-125">
              <div className="m-auto">
                <i className="fas fa-plus text-2xl" />
                <p className="text-sm font-bold">{t(`${props.newItemText}`)}</p>
              </div>
            </span>
          </div>
        )}
        {props.list?.map((item: T, index: number) => (
          <props.Card item={item} key={index} />
        ))}
      </div>
    </div>
  )
}
