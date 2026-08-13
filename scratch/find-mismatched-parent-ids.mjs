import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function findMismatches() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const res = await client.query(`
    SELECT table_name, column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' AND column_name IN ('id', '_parent_id')
    ORDER BY table_name, column_name;
  `)

  const tables = {}
  for (const row of res.rows) {
    if (!tables[row.table_name]) tables[row.table_name] = {}
    tables[row.table_name][row.column_name] = row.data_type
  }

  console.log('Tables with _parent_id column:')
  for (const [t, cols] of Object.entries(tables)) {
    if (cols._parent_id) {
      console.log(`Table: ${t} -> id: ${cols.id}, _parent_id: ${cols._parent_id}`)
    }
  }

  await client.end()
}

findMismatches().catch(err => {
  console.error(err)
  process.exit(1)
})
