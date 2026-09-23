import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function main() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected!')

  const cols = await client.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name='products' ORDER BY column_name`
  )
  console.log('PRODUCT COLUMNS:', cols.rows.map(r => r.column_name).join(', '))

  const res = await client.query('SELECT id, title, slug, "_status", enabled, inventory, "created_at", "updated_at" FROM products ORDER BY id')
  console.log('PRODUCTS:')
  for (const r of res.rows) console.log(JSON.stringify(r))

  const v = await client.query('SELECT id, "version_title", "version_slug", "version__status" FROM "_products_v" ORDER BY id')
  console.log('VERSION ROWS:')
  for (const r of v.rows) console.log(JSON.stringify(r))

  const cats = await client.query('SELECT column_name FROM information_schema.columns WHERE table_name IN (\'products_categories\',\'products_rels\',\'_products_v_blocks_product_feature\',\'_products_v_blocks_product_feature_features\') ORDER BY table_name, column_name')
  console.log('REL/STRUCTURE COLS:')
  for (const r of cats.rows) console.log(`${r.table_name}.${r.column_name}`)

  await client.end()
}
main().catch(console.error)
