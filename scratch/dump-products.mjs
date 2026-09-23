import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function main() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const cols = await client.query(
    SELECT column_name FROM information_schema.columns
    WHERE table_name='products' ORDER BY column_name
  )
  console.log('PRODUCT COLUMNS:', cols.rows.map(r=>r.column_name).join(', '))

  const res = await client.query('SELECT id, title, slug, \"_status\", enabled, inventory FROM products ORDER BY id')
  console.log('PRODUCT ROWS:', JSON.stringify(res.rows, null, 2))
  console.log('COUNT:', res.rows.length)

  const vres = await client.query('SELECT id, \"version_title\", \"version_slug\", \"version__status\" FROM _products_v ORDER BY id')
  console.log('VERSION ROWS (title/slug/status):', JSON.stringify(vres.rows.map(r=>({id:r.id,title:r.version_title,slug:r.version_slug,status:r.version__status})), null, 2))

  await client.end()
}
main().catch(console.error)
