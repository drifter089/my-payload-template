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

const Section: React.FC<PageSection> = async ({
  backgroundColor,
  component,
  cards,
  id,
  blockName,
  blockType,
  limit,
  subheading,
  heading,
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

  return (
    <div
      id={blockName || ''}
      className={`${backgroundColor === 'secondary' ? 'bg-secondary' : 'bg-background'} max-w[100vw] w-[100vw] overflow-hidden mx-auto pb-[8rem]`}
    >
      <TextSection heading={heading} paragraph={subheading} backgroundColor={backgroundColor} />

      {(() => {
        switch (component) {
          case 'carousel':
            switch (cards) {
              case 'horizontalcards':
                return MakeCarousel(collectionsData.docs, 'horizontal')

              case 'verticalcard':
                return MakeCarousel(eventsData.docs, 'vertical')

              default:
                return null
            }

          case 'basic':
            switch (cards) {
              case 'horizontalcards':
                return MakeFlex(collectionsData.docs, 'horizontal')

              case 'verticalcard':
                return MakeFlex(eventsData.docs, 'vertical')

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
        className="w-[100%] max-w-[100vw] overflow-hidden relative mt-12 mb-8"
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
              default:
                return null
            }
          })}
        </CarouselContent>
        <CarouselPrevious
          className="absolute bottom-0 left-8 mb-4 transform -translate-y-1"
          style={{ top: '50%' }}
        />
        <CarouselNext
          className="absolute bottom-0 right-8 mb-4 transform -translate-y-1"
          style={{ top: '50%' }}
        />
      </Carousel>
    </>
  )
}

const MakeFlex = (data: any[], cardType: string) => {
  return (
    <div className="max-w-[100vw] w-[100vw] flex flex-wrap default-x-padding justify-center items-center align-middle gap-5 overflow-hidden mt-20 mb-10 ">
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
          default:
            return null
        }
      })}
    </div>
  )
}
