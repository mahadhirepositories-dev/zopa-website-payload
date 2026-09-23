import pg from '../scratch/../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function main() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  const res = await client.query('SELECT id, title, slug, "_status", inventory, "price_in_i_n_r", enabled FROM products ORDER BY id')
  console.log('PRODUCTS:')
  for (const r of res.rows) console.log(JSON.stringify(r))
  const v = await client.query('SELECT id, "version_title", "version_slug", "version__status", "_locale" FROM "_products_v" ORDER BY id')
  console.log('VERSIONS:')
  for (const r of v.rows) console.log(JSON.stringify(r))
  await client.end()
}
main().catch(console.error)
