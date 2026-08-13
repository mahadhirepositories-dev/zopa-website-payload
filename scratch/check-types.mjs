import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkTypes() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const r1 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '_pages_v_blocks_product' AND column_name = 'id';`)
  const r2 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '_pages_v_blocks_product_features' AND column_name = '_parent_id';`)

  console.log('_pages_v_blocks_product.id data_type:', r1.rows[0]?.data_type)
  console.log('_pages_v_blocks_product_features._parent_id data_type:', r2.rows[0]?.data_type)

  await client.end()
}

checkTypes().catch(console.error)
