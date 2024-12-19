import type {
  CollectionAfterChangeHook,
  CollectionAfterReadHook,
  CollectionBeforeReadHook,
} from 'payload'
import { loadEnvConfig } from '@next/env'

import type { Post } from '../../../payload-types'

export const generatedLink: CollectionBeforeReadHook<Post> = async ({
  doc,
  //   previousDoc,
  req: { payload },
}) => {
  const nextBaseUrl = process.env.VERCEL_URL || 'localhost:3000'
  const generatedLink = `https://${nextBaseUrl}/meethub/event/${doc.slug}`

  //   const t = { ...doc }
  doc.generatedLink = generatedLink

  return doc
}
