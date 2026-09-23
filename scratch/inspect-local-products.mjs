import pg from '../node_modules/.pnpm/pg@8.23.0/node_modules/pg/lib/index.js'
async function main() {
  const client = new pg.Client({ connectionString: 'postgres://postgres:root@127.0.0.1:5432/zopa' })
  await client.connect()
  console.log('connected')
  const res = await client.query(`SELECT id, title, slug, "_status", inventory, "price_in_i_n_r", "price_in_i_n_r_enabled", "created_at", "updated_at", "deleted_at" FROM products ORDER BY id`)
  console.log('products:')
  for (const r of res.rows) console.log(JSON.stringify(r))
  await client.end()
}
main().catch(console.error)
