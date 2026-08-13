import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function setupDbMediaStorage() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  await client.query(`
    CREATE TABLE IF NOT EXISTS "media_files" (
      "filename" varchar PRIMARY KEY,
      "mime_type" varchar NOT NULL,
      "data" bytea NOT NULL,
      "created_at" timestamp with time zone DEFAULT now()
    );
  `)
  console.log('media_files table created successfully!')

  await client.end()
}

setupDbMediaStorage().catch(console.error)
