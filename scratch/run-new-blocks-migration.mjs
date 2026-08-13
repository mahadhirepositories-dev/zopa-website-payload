import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'
import { up } from '../src/migrations/20260812_100000_add_new_blocks.ts'

async function runMigration() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase...')

  const mockDb = {
    execute: async (query) => {
      // execute query
      const sqlStr = query.text || query.sql || query.toString()
      await client.query(sqlStr)
    }
  }

  await up({ db: mockDb })
  console.log('Migration 20260812_100000_add_new_blocks executed successfully!')

  await client.query(`
    INSERT INTO payload_migrations (name, batch)
    VALUES ('20260812_100000_add_new_blocks', 1)
    ON CONFLICT DO NOTHING;
  `)

  await client.end()
}

runMigration().catch(err => {
  console.error('Migration error:', err)
  process.exit(1)
})
