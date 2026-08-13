import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkPgStorage() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  try {
    const buckets = await client.query('SELECT * FROM storage.buckets;')
    console.log('Buckets:', buckets.rows)
  } catch (e) {
    console.error('Bucket query error:', e.message)
  }

  try {
    const objects = await client.query('SELECT name, bucket_id, created_at FROM storage.objects;')
    console.log('Objects in storage.objects:', objects.rows)
  } catch (e) {
    console.error('Objects query error:', e.message)
  }

  try {
    const media = await client.query('SELECT id, filename, url FROM media;')
    console.log('Media records in DB:', media.rows)
  } catch (e) {
    console.error('Media query error:', e.message)
  }

  await client.end()
}

checkPgStorage().catch(console.error)
