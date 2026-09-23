import pg from '../node_modules/.pnpm/pg@8.23.0/node_modules/pg/lib/index.js'
async function main() {
  const client = new pg.Client({ connectionString: 'postgres://postgres:root@127.0.0.1:5432/zopa' })
  await client.connect()
  console.log('LOCAL zopa connected')

  const res = await client.query(`SELECT id, title, slug, "_status", inventory, "price_in_i_n_r", "price_in_i_n_r_enabled", "image_id", "created_at", "updated_at", "deleted_at" FROM products ORDER BY id`)
  console.log('=== products (base table) ===')
  for (const r of res.rows) console.log(JSON.stringify(r))

  console.log('=== _products_v (versions) ordered, latest per parent ===')
  const v = await client.query(`SELECT id, "version_title", "version_slug", "version__status", "_parent_id", "created_at", "updated_at" FROM "_products_v" ORDER BY "_parent_id", id`)
  for (const r of v.rows) console.log(JSON.stringify(r))

  console.log('=== latest version per parent (Payload list source) ===')
  const latest = await client.query(`
    SELECT DISTINCT ON ("_parent_id") "_parent_id" AS parent, "version_title" AS title, "version_slug" AS slug, "version__status" AS status
    FROM "_products_v" ORDER BY "_parent_id", id DESC`)
  for (const r of latest.rows) console.log(JSON.stringify(r))

  await client.end()
}
main().catch(console.error)
