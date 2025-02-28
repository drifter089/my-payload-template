import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import VerticalCardComponent from '@/collections/VerticalCards/VerticalCardComponent'

import type { PageSection } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import TextSection from '@/components/headingSection'
import HorizantalCardComponent from '@/collections/HorizontalCards/HorizontalCardComponent'
import { Button } from '@/components/ui/button'
import PlatformIconLink from '@/collections/Platforms/PlatformIconLink'
// import { Button } from '@payloadcms/ui'

const page = async () => {
  const payload = await getPayload({ config: configPromise })

  const horizontalcards = await payload.find({
    collection: 'horizontalcards',
    limit: 1,
  })

  const verticalcards = await payload.find({
    collection: 'verticalcards',
    limit: 1,
  })

  const platformsdata = await payload.find({
    collection: 'platforms',
    limit: 1,
  })

  return (
    <>
      <div className="w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center justify-center gap-8">
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
        <HorizantalCardComponent {...horizontalcards.docs[0]} />
        <VerticalCardComponent {...verticalcards.docs[0]} />
        <PlatformIconLink {...platformsdata.docs[0]} />
      </div>
    </>
  )
}

export default page
