import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET() {
  let payloadStatus = 'unknown'
  let payloadError: any = null
  let collections: string[] = []

  try {
    const payload = await getPayload({ config })
    payloadStatus = 'connected'
    collections = Object.keys(payload.collections || {})
  } catch (err: any) {
    payloadStatus = 'error'
    payloadError = {
      message: err?.message,
      stack: err?.stack,
      name: err?.name,
    }
  }

  return Response.json({
    version: '2026-09-12-v3',
    timestamp: new Date().toISOString(),
    payloadStatus,
    payloadError,
    collectionsCount: collections.length,
  })
}
