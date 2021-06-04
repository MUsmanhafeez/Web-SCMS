import React, { FC } from 'react'
import { SimpleTestimonial } from './SimpleTestimonial'

export const MultipleTestimonial: FC = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-8 md:mb-0 flex-between items-center p-8">
      <SimpleTestimonial withShadow={true} />

      <SimpleTestimonial withShadow={true} />

      <SimpleTestimonial withShadow={true} />
    </div>
  )
}
