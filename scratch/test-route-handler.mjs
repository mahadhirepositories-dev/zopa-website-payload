import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function testFetchDbMedia() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const res = await client.query('SELECT filename, mime_type, length(data) as size FROM media_files;')
  console.log('Stored media files in DB:', res.rows)

  await client.end()
}

testFetchDbMedia().catch(console.error)
