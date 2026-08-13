import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function testConnection() {
  const connString = 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
  console.log('Testing:', connString)
  const client = new pg.Client({
    connectionString: connString,
    ssl: { rejectUnauthorized: false },
  })
  try {
    await client.connect()
    console.log('SUCCESS CONNECTED!')
    const res = await client.query('SELECT name FROM payload_migrations ORDER BY id ASC;')
    console.log('Applied migrations:', res.rows.map(r => r.name))

    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
    console.log('Total tables count:', tables.rows.length)

    await client.end()
  } catch (e) {
    console.error('Connection error:', e)
  }
}

testConnection()
