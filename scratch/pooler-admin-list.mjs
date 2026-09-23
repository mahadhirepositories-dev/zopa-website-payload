import pg from '../node_modules/.pnpm/pg@8.23.0/node_modules/pg/lib/index.js'

// The pooler connection that scratch scripts successfully used against products data
const CONN = 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'

async function main() {
  const client = new pg.Client({ connectionString: CONN, ssl: { rejectUnauthorized: false } })
  await client.connect()
  console.log('connected to pooler')

  // 1. What the Payload admin list returns with default (no status filter)
  const all = await client.query(`SELECT id, title, slug, "_status", "deleted_at" FROM products ORDER BY id`)
  console.log('=== products (no filter) ===')
  for (const r of all.rows) console.log(JSON.stringify(r))

  // 2. Simulate Payload admin list query for a versions+drafts collection:
  //    reads latest published version rows via _products_v join semantics
  const stats = await client.query(`
    SELECT "_status", count(*) AS n FROM products GROUP BY "_status" ORDER BY "_status"`)
  console.log('=== products grouped by _status ===')
  for (const r of stats.rows) console.log(JSON.stringify(r))

  // 3. Payload drafts: latest version per doc in _products_v
  const v = await client.query(`
    SELECT "parent_id", "version_title", "version_slug", "version__status", "created_at"
    FROM "_products_v" ORDER BY "parent_id", "created_at"`)
  console.log('=== _products_v ordered (latest last) ===')
  for (const r of v.rows) console.log(JSON.stringify(r))

  await client.end()
}
main().catch(console.error)
