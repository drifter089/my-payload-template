import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import VerticalCardComponent from '@/collections/VerticalCards/VerticalCardComponent'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    depth: 5,
    limit: 1000,
    overrideAccess: false,
  })

  console.log('projects', projects)

  return (
    <div className="grid grid-cols-3 gap-4 w-full mx-auto px-12">
      <PageClient />
      <h1 className="col-span-3 text-8xl font-bold py-8">Projects</h1>
      {projects.docs.map((project) => {
        console.log('project', project)
        return (
          // <Card key={project.id} className="col-span-1 h-40 w-full">
          //   <Button variant={'secondary'}>
          //     <Link href={`projects/${project.slug}`}>read more</Link>
          //   </Button>
          // </Card>
          <VerticalCardComponent
            key={project.id}
            image={project.heroImage ?? ''}
            headline={project.title ?? ''}
            content={project.subtitle ?? ''}
            date={project.publishedAt ?? ''}
            slug={`projects/${project.slug}`}
          />
        )
      })}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
