import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function findJwtSecret() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  
  try {
    const res = await client.query("SHOW app.settings.jwt_secret;")
    console.log('jwt_secret:', res.rows)
  } catch (e) {
    console.error('jwt error:', e.message)
  }

  try {
    const res = await client.query("SELECT * FROM auth.schema_migrations LIMIT 5;")
    console.log('auth migrations:', res.rows)
  } catch (e) {
    console.error('auth error:', e.message)
  }

  await client.end()
}

findJwtSecret().catch(console.error)
