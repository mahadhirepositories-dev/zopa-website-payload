import { getPayload } from 'payload'
import config from './src/payload.config.ts'
import pg from './node_modules/.pnpm/pg@8.30.0/node_modules/pg/lib/index.js'

const connectionString = 'postgres://postgres:root@127.0.0.1:5432/zopa'
async function main() {
  // 1) Raw products + versions, with Payload's own deleted/status semantics
  const c = new pg.Client({ connectionString })
  await c.connect()

  const live = await c.query(`SELECT id, title, slug, "_status", "deleted_at" FROM products ORDER BY id`)
  console.log('--- products table (raw) ---')
  for (const r of live.rows) console.log(JSON.stringify(r))

  // Payload's list query for versions-enabled collection reads ONLY the latest version row per parent,
  // and Payload HARD-COUNTS from that too. Payload 3 list shows docs where latest version _status != deleted
  const v = await c.query(`
    SELECT DISTINCT ON ("_parent_id") "_parent_id" AS parent,
      "version_title" AS title, "version_slug" AS slug, "version__status" AS status, "version_inventory" AS inv,
      "created_at" AS vcreated, id AS version_id
    FROM "_products_v" ORDER BY "_parent_id", id DESC`)
  console.log('--- _products_v latest-version-per-parent (what list actually renders) ---')
  for (const r of v.rows) console.log(JSON.stringify(r))

  await c.end()

  // 2) Payload bootstrap (uses node pg runtime path, not our manual client)
  const payload = await getPayload({ config })
  console.log('\n--- payload initialized, collections ---', Object.keys(payload.collections).join(','))

  const { docs, totalDocs } = await payload.find({
    collection: 'products',
    limit: 10,
    sort: '-updatedAt',
  })
  console.log('--- payload.find(products) via runtime ---')
  console.log('totalDocs', totalDocs, 'docs.length', docs.length)
  for (const d of docs) console.log(JSON.stringify({ id: d.id, title: d.title, slug: d.slug, _status: d._status }))
}
main().catch(console.error)
