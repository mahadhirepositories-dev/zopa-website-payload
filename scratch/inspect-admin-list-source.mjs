import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function main() {
  const client = new pg.Client({
    connectionString: 'postgres postgres:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase(Supabase) DB!')

  // Exact columns Payload uses for list + _status + versions
  const res = await client.query(`
    SELECT id, title, slug, "_status", inventory, "price_in_i_n_r", "price_in_i_n_r_enabled", "deleted_at"
    FROM products
    WHERE "deleted_at" IS NULL
    ORDER BY id`)
  console.log('NON-DELETED products (should feed admin list):')
  for (const r of res.rows) console.log(JSON.stringify(r))

  // Relationship/feature tables that may be missing & break row rendering
  const tables = await client.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema='public' AND table_name LIKE 'products_%'
    ORDER BY table_name`)
  console.log('products_* tables:', tables.rows.map(r=>r.table_name).join(', '))

  await client.end()
}
main().catch(console.error)
