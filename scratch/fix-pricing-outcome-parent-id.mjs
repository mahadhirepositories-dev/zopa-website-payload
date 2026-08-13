import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixPricingOutcomeParentId() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `ALTER TABLE "pricing_cards_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "outcome_cta_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "pages_blocks_pricing_cards_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "pages_blocks_outcome_cta_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "_pages_v_blocks_pricing_cards_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`,
    `ALTER TABLE "_pages_v_blocks_outcome_cta_link" ALTER COLUMN "_parent_id" TYPE integer USING NULLIF("_parent_id", '')::integer;`
  ]

  for (const stmt of statements) {
    try {
      await client.query(stmt)
      console.log('Executed:', stmt)
    } catch (e) {
      console.log('Error executing stmt:', e.message)
    }
  }

  await client.end()
}

fixPricingOutcomeParentId().catch(console.error)
