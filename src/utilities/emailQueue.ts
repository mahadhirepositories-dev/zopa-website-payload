import { type Payload } from 'payload'
import { buildOrderHtml, sendOrderEmail } from './sendOrderEmail'

const MAX_ATTEMPTS = 6
const BATCH = 25

// Enqueue happens SYNCHRONOUSLY before the response returns — durable even if
// the serverless function dies right after. `orderId` is unique in the emails
// table, so replays of /api/verify-payment resolve to the SAME job (no double mail).
export async function enqueueOrderEmail(payload: Payload, order: any, items: any[]) {
  const existing = await payload.find({
    collection: 'emails',
    where: { orderId: { equals: order.id } },
    limit: 1,
  })
  if (existing.docs.length > 0) return existing.docs[0]

  return payload.create({
    collection: 'emails',
    data: {
      orderId: order.id,
      to: order.customerEmail,
      subject: `Zopa - Order Confirmation (Order #${order.id})`,
      html: buildOrderHtml(items, order),
      status: 'pending',
      attempts: 0,
      nextRetryAt: new Date().toISOString(), // due immediately
    },
  })
}

// Atomically claim a job so two overlapping cron runners never double-send.
async function claimJob(payload: Payload, jobId: string | number): Promise<boolean> {
  const res = await payload.update({
    collection: 'emails',
    where: {
      and: [
        { id: { equals: jobId } },
        { status: { in: ['pending', 'failed'] } },
      ],
    },
    data: { status: 'processing' },
  })
  return res.docs.length > 0
}

const backoff = (attempt: number) =>
  Math.min(6 * 60 * 60 * 1000, 10_000 * Math.pow(6, attempt - 1))
// attempts: 1 → 10s, 2 → 1m, 3 → 6m, 4 → 36m, 5 → 3.6h, 6 → 6h (max)

export async function processEmailJob(payload: Payload, jobId: string | number) {
  if (!(await claimJob(payload, jobId))) return { ok: true, skipped: true }

  const job = await payload.findByID({ collection: 'emails', id: jobId })

  let order: any
  try {
    order = await payload.findByID({
      collection: 'orders',
      id: job.orderId,
      depth: 2,
      overrideAccess: true,
    })
  } catch (e) {
    // Order vanished — sink the job rather than spinning forever.
    await payload.update({
      collection: 'emails',
      id: job.id,
      data: { status: 'failed', lastError: `Order ${job.orderId} not found`, attempts: (job.attempts ?? 0) + 1 },
    })
    return { ok: false, error: 'order not found', attempts: (job.attempts ?? 0) + 1 }
  }

  // Build items fresh from the order, not from stored html, so nothing desyncs.
  const items = (order.items ?? []).map((it: any) => ({
    product: it.product,
    quantity: it.quantity,
  }))
  order.customerEmail = order.customerEmail || job.to

  const result = await sendOrderEmail(order, items)
  const attempts = (job.attempts ?? 0) + 1

  if (result.ok) {
    await payload.update({
      collection: 'emails',
      id: job.id,
      data: { status: 'sent', sentAt: new Date().toISOString(), attempts, lastError: '' },
    })
    return { ok: true, attempts }
  }

  const exhausted = attempts >= MAX_ATTEMPTS
  await payload.update({
    collection: 'emails',
    id: job.id,
    data: {
      status: exhausted ? 'failed' : 'pending',
      attempts,
      lastError: result.error,
      nextRetryAt: exhausted ? null : new Date(Date.now() + backoff(attempts)).toISOString(),
    },
  })
  return { ok: false, error: result.error, attempts, willRetry: !exhausted }
}

// Called by the cron endpoint. Failed (exhausted) jobs have nextRetryAt = null
// and are excluded, so they stay visible in admin and can be manually retried.
export async function retryDueEmails(payload: Payload) {
  const due = await payload.find({
    collection: 'emails',
    where: {
      and: [
        { status: { not_equals: 'sent' } },
        { nextRetryAt: { less_than: new Date().toISOString() } },
      ],
    },
    limit: BATCH,
    sort: 'createdAt',
  })
  const results: unknown[] = []
  for (const job of due.docs) {
    results.push(await processEmailJob(payload, String(job.id)))
  }
  return results
}

export { buildOrderHtml }