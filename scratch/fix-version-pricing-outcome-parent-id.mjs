import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixVersionPricingOutcomeParentId() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `ALTER TABLE "_pricing_cards_link_v" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "_outcome_cta_link_v" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`
  ]

  for (const stmt of statements) {
    try {
      await client.query(stmt)
      console.log('Executed:', stmt)
    } catch (e) {
      console.error('Error:', e.message)
    }
  }

  await client.end()
}

fixVersionPricingOutcomeParentId().catch(console.error)
