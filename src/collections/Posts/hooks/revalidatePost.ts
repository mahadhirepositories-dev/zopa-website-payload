import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      try {
        revalidatePath(path)
        revalidateTag('posts-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Failed to revalidate post at path: ${path} - ${(err as Error).message}`)
      }
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidateTag('posts-sitemap', 'max')
      } catch (err) {
        payload.logger.warn(`Failed to revalidate old post at path: ${oldPath} - ${(err as Error).message}`)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    try {
      revalidatePath(path)
      revalidateTag('posts-sitemap', 'max')
    } catch {
      // safe fallback outside Next.js request context
    }
  }

  return doc
}
