import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function testSanitizedQuery() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const rawFilename = 'g1.png?2026-08-13T01%3A02%3A01.887Z'
  let sanitized = decodeURIComponent(rawFilename)
  if (sanitized.includes('?')) sanitized = sanitized.split('?')[0]

  console.log('Raw:', rawFilename)
  console.log('Sanitized:', sanitized)

  const res = await client.query('SELECT filename, length(data) FROM media_files WHERE filename = $1;', [sanitized])
  console.log('Query result:', res.rows)

  await client.end()
}

testSanitizedQuery().catch(console.error)
