import React from 'react'
import type { Horizontalcard } from '@/payload-types'
import Image from 'next/image'

const HorizantalCardComponent: React.FC<Horizontalcard> = ({ heading, content, image }) => {
  return (
    <div className="w-[20rem] md:w-[50rem] rounded-[2.5rem] overflow-hidden border shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-wrap md:flex-nowrap bg-background">
      <div className="relative h-[20rem] w-[20rem]">
        {typeof image !== 'string' && image?.url && (
          <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
        )}
      </div>

      <div className="md:w-[60%] p-3 flex flex-col justify-center gap-2">
        <h2 className="text-title-bold">{heading}</h2>
        <p className="text-paragraph">{content}</p>
      </div>
    </div>
  )
}

export default HorizantalCardComponent
