import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { retryDueEmails } from '@/utilities/emailQueue'

export const runtime = 'nodejs'
export const maxDuration = 60

async function handle(req: Request) {
  const expected = process.env.CRON_SECRET
  const auth = req.headers.get('authorization') ?? ''
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = await getPayload({ config })
  const results = await retryDueEmails(payload)
  return NextResponse.json({ processed: results.length })
}

export async function POST(req: Request) {
  return handle(req)
}

// Vercel Cron sends only GET — exporting it makes the scheduled request work.
export const GET = POST
