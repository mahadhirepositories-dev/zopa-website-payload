const { Client } = require('./node_modules/.pnpm/pg@8.20.0/node_modules/pg')

const client = new Client({
  connectionString: 'postgresql://postgres:ProcureZOPA2026@db.junhxesyfpnqapxaulvj.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
})

async function check() {
  await client.connect()
  console.log('Connected to Supabase DB!')

  // Check migrations
  const migrationsRes = await client.query('SELECT name, batch FROM payload_migrations ORDER BY id ASC;')
  console.log('Applied migrations:', migrationsRes.rows)

  // Check if _svc_v table exists
  const tablesRes = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%svc%';")
  console.log('SVC-related tables:', tablesRes.rows.map(r => r.table_name))

  await client.end()
}

check().catch(err => {
  console.error('DB Check Error:', err)
  process.exit(1)
})
