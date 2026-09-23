import 'dotenv/config'
import pg from 'pg'
const connect = db => {
  const u = new URL(process.env.DATABASE_URL)
  u.pathname = '/' + db
  return new pg.Client({ connectionString: u.toString(), connectionTimeoutMillis: 5000, statement_timeout: 8000 })
}
for (const db of ['e_commerce', 'ecm_database']) {
  const c = connect(db)
  await c.connect()
  console.log(`\n########## ${db}`)
  const pages = (await c.query(`SELECT id, slug, title, hero_type, hero_heading, created_at::date cr, updated_at::date up FROM pages ORDER BY id`)).rows
  for (const p of pages) console.log(`  PAGE #${p.id} "${p.title}" slug=${p.slug} hero=${p.hero_type}/${p.hero_heading ?? ''} created=${p.cr} updated=${p.up}`)
  // block rows attached to pages
  const blocks = (await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE 'pages_blocks_%' ORDER BY table_name`)).rows
  for (const { table_name: t } of blocks) {
    const n = (await c.query(`SELECT count(*)::int n FROM "${t}"`)).rows[0].n
    if (n > 0) {
      const sample = (await c.query(`SELECT * FROM "${t}" LIMIT 2`)).rows
      const keys = Object.keys(sample[0] || {}).filter(k => sample[0][k] !== null).slice(0, 10)
      console.log(`  ${t}: ${n} rows | cols-with-data: ${keys.join(', ')}`)
    }
  }
  if ((await c.query(`SELECT 1 FROM information_schema.tables WHERE table_name='products'`)).rows.length) {
    const pr = (await c.query(`SELECT id, title, price_in_inr FROM products ORDER BY id LIMIT 10`).catch(() => (await c.query(`SELECT id FROM products ORDER BY id LIMIT 10`)))).rows
    console.log('  PRODUCTS:', pr.map(r => JSON.stringify(r)).join(' | '))
  }
  await c.end()
}
