import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function inspectVersionParentIds() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const res = await client.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE column_name = '_parent_id' 
      AND (table_name LIKE '_pages_v%' OR table_name LIKE 'pages_blocks%')
    ORDER BY table_name;
  `)

  for (const row of res.rows) {
    console.log(`${row.table_name}._parent_id -> ${row.data_type}`)
  }

  await client.end()
}

inspectVersionParentIds().catch(console.error)
