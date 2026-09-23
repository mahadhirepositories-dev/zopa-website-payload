import pg from '../node_modules/.pnpm/pg@8.23.0/node_modules/pg/lib/index.js'
async function main() {
  const client = new pg.Client({ connectionString: 'postgres://postgres:root@127.0.0.1:5432/zopa' })
  await client.connect()
  console.log('connected')

  // What does Payload's admin list "1-1 of 1" actually return? Look at the products row fully including blocks
  const res = await client.query(`
    SELECT p.id, p.title, p.slug, p."_status", p.inventory,
           (SELECT count(*) FROM products p2 WHERE p2.deleted_at IS NULL) AS visible_count
    FROM products p WHERE p.deleted_at IS NULL ORDER BY p.id`)
  for (const r of res.rows) console.log('NON-DELETED PRODUCT:', JSON.stringify(r))

  // Check rows referencing this product as page (the "Vendor Registration page" they mentioned)
  const pages = await client.query(`SELECT id, title, slug, "_status", "deleted_at" FROM pages WHERE slug ILIKE '%vendor%' OR title ILIKE '%vendor%'`)
  console.log('PAGES matching vendor:')
  for (const r of pages.rows) console.log(JSON.stringify(r))

  // Draft-only pages query
  const draftsClause = await client.query(`SELECT count(*)::int AS c FROM "_pages_v"`)
  console.log('_pages_v total rows:', draftsClause.rows[0].c)

  await client.end()
}
main().catch(console.error)
