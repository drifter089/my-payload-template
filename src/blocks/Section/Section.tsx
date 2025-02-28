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
import PlatformIconLink from '@/collections/Platforms/PlatformIconLink'

const Section: React.FC<PageSection> = async ({
  component,
  cards,
  id,
  blockName,
  blockType,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const collectionsData = await payload.find({
    collection: 'horizontalcards',
    limit: limit,
  })

  const eventsData = await payload.find({
    collection: 'events',
    limit: limit,
  })

  const platforms = await payload.find({
    collection: 'platforms',
    draft: false,
    limit: 1000,
  })

  return (
    <div id={blockName || ''} className={`bg-background w-full max-w-[100vw] overflow-x-hidden`}>
      <TextSection heading={component} paragraph={cards} />

      {(() => {
        switch (component) {
          case 'carousel':
            switch (cards) {
              case 'horizontalcards':
                return MakeCarousel(collectionsData.docs, 'horizontal')

              case 'verticalcard':
                return MakeCarousel(eventsData.docs, 'vertical')

              case 'platforms':
                return MakeCarousel(platforms.docs, 'platform')

              default:
                return null
            }

          case 'basic':
            switch (cards) {
              case 'horizontalcards':
                return MakeFlex(collectionsData.docs, 'horizontal')

              case 'verticalcard':
                return MakeFlex(eventsData.docs, 'vertical')

              case 'platforms':
                return MakeFlex(platforms.docs, 'platform')

              default:
                return null
            }
          case 'grid':
            switch (cards) {
              case 'horizontalcards':
                return MakeGrid(collectionsData.docs, 'horizontal')

              case 'verticalcard':
                return MakeGrid(eventsData.docs, 'vertical')

              case 'platforms':
                return MakeGrid(platforms.docs, 'platform')

              default:
                return null
            }
          default:
            return null
        }
      })()}
    </div>
  )
}
export default Section

const MakeCarousel = (data: any[], cardType: string) => {
  return (
    <>
      <Carousel
        className="w-[100%] max-w-[100vw] relative mt-4 md:mt-8 2xl:mt-16 mb-6 md:mb-12 2xl:mb-20 px-8"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {data.map((block) => {
            switch (cardType) {
              case 'horizontal':
                return (
                  <div className="p-1">
                    <CarouselItem key={block.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <HorizantalCardComponent
                        key={block.id}
                        heading={block.heading}
                        content={block.content}
                        image={block.image}
                        id={block.id}
                        updatedAt={block.updatedAt}
                        createdAt={block.createdAt}
                      />
                    </CarouselItem>
                  </div>
                )
              case 'vertical':
                return (
                  <div className="p-1">
                    <CarouselItem key={block.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <VerticalCardComponent
                        key={block.id}
                        image={block.image}
                        date={block.createdAt}
                        headline={block.title}
                        content={block.content}
                        id={block.id}
                        updatedAt={block.updatedAt}
                        createdAt={block.publishedAt}
                      />
                    </CarouselItem>
                  </div>
                )
              case 'platform':
                return (
                  <div className="p-1">
                    <CarouselItem key={block.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <PlatformIconLink {...block} />
                    </CarouselItem>
                  </div>
                )

              default:
                return null
            }
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1" />
        <CarouselNext className="absolute right-1" />
      </Carousel>
    </>
  )
}

const MakeFlex = (data: any[], cardType: string) => {
  return (
    <div className="max-w-[100vw] w-[100vw] flex flex-wrap default-x-padding justify-center items-center align-middle gap-5 overflow-hidden mt-4 md:mt-8 2xl:mt-16 mb-6 md:mb-12 2xl:mb-20">
      {data.map((block) => {
        switch (cardType) {
          case 'horizontal':
            return (
              <HorizantalCardComponent
                key={block.id}
                heading={block.heading}
                content={block.content}
                image={block.image}
                id={block.id}
                updatedAt={block.updatedAt}
                createdAt={block.createdAt}
              />
            )
          case 'vertical':
            return (
              <VerticalCardComponent
                key={block.id}
                image={block.image}
                date={block.publishedAt}
                headline={block.title}
                content={block.content}
                id={block.id}
                updatedAt={block.updatedAt}
                createdAt={block.createdAt}
              />
            )
          case 'platform':
            return <PlatformIconLink {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}

const MakeGrid = (data: any[], cardType: string) => {
  return (
    <div className="max-w-[100vw] w-[100vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-4 md:mt-8 2xl:mt-16 mb-6 md:mb-12 2xl:mb-20">
      {data.map((block) => {
        switch (cardType) {
          case 'horizontal':
            return (
              <HorizantalCardComponent
                key={block.id}
                heading={block.heading}
                content={block.content}
                image={block.image}
                id={block.id}
                updatedAt={block.updatedAt}
                createdAt={block.createdAt}
              />
            )
          case 'vertical':
            return (
              <VerticalCardComponent
                key={block.id}
                image={block.image}
                date={block.publishedAt}
                headline={block.title}
                content={block.content}
                id={block.id}
                updatedAt={block.updatedAt}
                createdAt={block.createdAt}
              />
            )
          case 'platform':
            return <PlatformIconLink {...block} />
          default:
            return null
        }
      })}
    </div>
  )
}
