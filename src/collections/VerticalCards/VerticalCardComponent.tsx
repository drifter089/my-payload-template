import React from 'react'
import type { Verticalcard } from '@/payload-types'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const VerticalCardComponent: React.FC<Verticalcard> = ({ image, content, headline, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''
  const Newcontent = (content || '').split(' ').slice(0, 15).join(' ')

  return (
    <Card className="min-w-[25rem] md:w-[25rem] rounded-radius overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-[15rem] overflow-hidden">
        {typeof image !== 'string' && image?.url && (
          <Image src={image.url} alt={image.alt || 'Card image'} fill className="object-cover" />
        )}
      </div>

      <div className="p-6 pt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-6 aspect-square relative inline-block">
            {typeof image !== 'string' && image?.url && (
              <Image
                src={`/api/media/file/clockIcon.svg`}
                alt={image.alt || 'Clock image'}
                fill
                className="object-cover "
              />
            )}
          </div>
          <span className="text-subparagraph-muted inline">{formattedDate}</span>
        </div>
        <h2 className="text-title-bold">{headline}</h2>
        <p className="text-subparagraph">{Newcontent}</p>
        <Button variant="secondary">more info</Button>
      </div>
    </Card>
  )
}

export default VerticalCardComponent
