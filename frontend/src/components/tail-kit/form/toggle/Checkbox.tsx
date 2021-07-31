import { ICheckboxState } from '@components/forms/addorganizationform'
import { FC } from 'react'

interface Props {
  checkboxes: ICheckboxState[]
  setCheckboxes: (checkBoxesData: ICheckboxState[]) => void
}

export const Checkbox: FC<Props> = ({ checkboxes, setCheckboxes }) => {
  const toggleCheckbox = (id, index) => {
    const checkBoxesData = checkboxes.map((checkbox) => {
      checkbox.checked = false
      return checkbox
    })
    checkBoxesData[index].checked = true
    setCheckboxes(checkBoxesData)
  }
  return (
    <div className="flex inline-block  ">
      {checkboxes.map((checkbox, index) => {
        return (
          <div key={index} className="p-2">
            <div className="relative inline-block w-4rem mr-4 px-4 align-middle select-none box h-7 w-6 ">
              <input
                type="checkbox"
                checked={checkbox.checked || false}
                name={checkbox.title}
                value={checkbox.title}
                className={`${
                  checkbox.checked
                    ? ` checked:bg-blue-600 checked:border-transparent `
                    : ` `
                } form-tick bg-white bg-check h-6 w-6 border border-gray-300 rounded-md  checked:border-transparent focus:outline-none`}
                onChange={() => toggleCheckbox(checkbox.id, index)}
              />

              <label
                htmlFor={checkbox.title}
                className="flex items-center space-x-3 mb-3"
              />
            </div>
            <span className="text-gray-400 text-sm">{checkbox.title}</span>
          </div>
        )
      })}
    </div>
  )
}
