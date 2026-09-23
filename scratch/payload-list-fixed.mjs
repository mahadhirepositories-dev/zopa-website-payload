import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const connectionString = 'postgres://postgres:root@127.0.0.1:5432/zopa'
async function main() {
  const payload = await getPayload({ config })
  console.log('\n--- payload initialized, collections ---', Object.keys(payload.collections).join(','))

  const { docs, totalDocs } = await payload.find({
    collection: 'products',
    limit: 10,
    sort: '-updatedAt',
  })
  console.log('--- payload.find(products) via runtime ---')
  console.log('totalDocs', totalDocs, 'docs.length', docs.length)
  for (const d of docs)
    console.log(JSON.stringify({ id: d.id, title: d.title, slug: d.slug, _status: d._status, deletedAt: d.deletedAt }))

  const draft = await payload.find({
    collection: 'products',
    draft: true,
    limit: 10,
    sort: '-updatedAt',
  })
  console.log('--- payload.find(products, draft:true) ---')
  console.log('totalDocs', draft.totalDocs, 'docs.length', draft.docs.length)
  for (const d of draft.docs)
    console.log(JSON.stringify({ id: d.id, title: d.title, slug: d.slug, _status: d._status }))

  process.exit(0)
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1) })