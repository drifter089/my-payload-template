import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'

const payload = await getPayload({ config: configPromise })

const landingPage = await payload.findGlobal({
  slug: 'home',
})

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <>
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
        <Image
          src={landingPage.image.url}
          alt={landingPage.image.alt || 'Site logo'}
          className="h-full object-contain"
          width={100}
          height={40}
        />
      </div>
    </>
  )
}
