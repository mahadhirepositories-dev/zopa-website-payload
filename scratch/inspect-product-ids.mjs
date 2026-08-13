import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function inspectProductIds() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const res = await client.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name IN ('_pages_v_blocks_product', '_pages_v_blocks_product_features', 'pages_blocks_product', 'pages_blocks_product_features')
    ORDER BY table_name, column_name;
  `)

  for (const row of res.rows) {
    console.log(`${row.table_name}.${row.column_name} -> ${row.data_type}`)
  }

  await client.end()
}

inspectProductIds().catch(console.error)
