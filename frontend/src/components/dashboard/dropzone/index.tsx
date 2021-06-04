import React, { useState } from 'react'

interface IDropzoneProps {
  children?: React.ReactNode
}

export const Dropzone: React.FC<IDropzoneProps> = (props) => {
  const [overLay, setOverLay] = useState(false)
  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOverLay(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOverLay(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOverLay(false)
  }
  return (
    <>
      <div
        className={`absolute w-full h-full ${
          overLay
            ? `z-20 opacity-50 bg-primary`
            : `z-0 opacity-0 bg-transparent`
        }`}
      >
        <div className="relative w-full h-full">
          <label
            htmlFor="mediaInput"
            className="text-2xl text-center inset-1/3 text-white font-bold absolute"
          >
            <div className="text-center">
              <i className="fal fa-cloud-upload-alt fa-2x"></i>
            </div>
            Drop to Upload
          </label>
          <input
            type="file"
            id="mediaInput"
            className={`w-full h-full opacity-0 `}
            onClick={(e) => {
              e.preventDefault()
            }}
            onDrop={(e) => handleDrop(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          />
        </div>
      </div>
      <div
        className={`relative ${overLay ? `z-0` : `z-20`}`}
        onDragEnter={(e) => handleDragEnter(e)}
      >
        {props.children}
      </div>
    </>
  )
}
