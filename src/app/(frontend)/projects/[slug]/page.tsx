import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import PageClient from '../../projects/[slug]/page.client'
import { Project as ProjectType } from '@/payload-types'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const url = '/projects/' + slug

  const project: ProjectType | null = await queryPageBySlug({
    slug,
  })

  // if (!post) return <PayloadRedirects url={url} />
  console.log('project', project)
  console.log('url', url)

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <h1 className="text-8xl font-bold py-8">{project?.title}</h1>
    </article>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    limit: 1000,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
  })

  return (
    pages.docs?.map(({ slug }) => ({
      slug: slug,
    })) || []
  )
}
