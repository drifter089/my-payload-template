import React from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

const VenueComponent = () => {
  return (
    <Card className="flex flex-col">
      <div className="flex items-left w-[80%%] justify-left m-3">
        <Avatar>
          <AvatarImage
            src="https://meethub-smoky.vercel.app/api/media/file/clockIcon.svg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4 font-normal text-[1.5rem]">
          Saturday, November 16, 2024
          <p>8:00pm</p>
        </div>
      </div>
      <div className="flex items-left w-[80%] justify-left m-3">
        <Avatar>
          <AvatarImage
            src="https://meethub-smoky.vercel.app/api/media/file/locationIcon.svg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4 font-semibold text-[1.5rem]">
          <p>The white mulberry</p>
          <div className="font-normal">
            <p>SILQ hotel Sukhumvit soi 24, 9th floor, Bangkok</p>
          </div>
        </div>
      </div>
      <Image
        src="https://meethub-smoky.vercel.app/api/media/file/maps.png"
        alt="Picture of the author"
        width={550}
        height={550}
      />
    </Card>
  )
}

export default VenueComponent
