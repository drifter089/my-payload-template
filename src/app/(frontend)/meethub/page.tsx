import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import LandingHeroComp from '@/blocks/Hero/Hero'
import Socials from '@/blocks/Socials/Socials'
import Section from '@/blocks/Section/Section'
import { FormBlock } from '@/blocks/Form/Component'

const page = async () => {
  const payload = await getPayload({ config: configPromise })

  const landingPage = await payload.findGlobal({
    slug: 'home',
  })

  const eventpages = await payload.find({
    collection: 'posts',
    limit: 1000,
  })

  console.log('layout', eventpages.docs)

  return (
    <>
      {landingPage.layout &&
        landingPage.layout.length > 0 &&
        landingPage.layout.map((block) => {
          const sectionId = block.blockName ? block.blockName : block.id
          if (block.blockType === 'Hero') {
            return (
              <LandingHeroComp
                blockType="Hero"
                backgroundColor={block.backgroundColor || 'primary'}
                heading={block.heading}
                content={block.content}
                image={block.image}
                reverse={block.reverse}
                key={block.id}
                blockName={sectionId}
              />
            )
          } else if (block.blockType === 'Social') {
            return (
              <Socials
                key={block.id}
                backgroundColor={block.backgroundColor || 'primary'}
                blockName={sectionId}
              />
            )
          } else if (block.blockType === 'section') {
            return (
              <Section
                key={block.id}
                backgroundColor={block.backgroundColor}
                component={block.component}
                cards={block.cards}
                blockType={block.blockType}
                blockName={sectionId}
                limit={block.limit}
                heading={block.heading}
                subheading={block.subheading}
              />
            )
          }
          return null
        })}
      {/* {eventpages.docs.map((event) => {
        if (event.form && typeof event.form !== 'string') {
          return (
            <FormBlock
              key={event.id}
              form={event.form}
              // enableIntro={event.enableIntro}
              // introContent={event.introContent}
            />
          )
        }
      })} */}
    </>
  )
}

export default page
