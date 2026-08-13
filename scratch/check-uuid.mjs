import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkUuidColumns() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  // Find all _pages_v_blocks tables
  const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '_pages_v_%';")
  
  const missingUuid = []
  for (const row of tablesRes.rows) {
    const tName = row.table_name
    const colsRes = await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 AND column_name = '_uuid';", [tName])
    if (colsRes.rows.length === 0) {
      missingUuid.push(tName)
    }
  }

  console.log('Version tables missing _uuid:', missingUuid)
  await client.end()
}

checkUuidColumns().catch(err => {
  console.error(err)
  process.exit(1)
})
