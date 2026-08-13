import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function addPathCols() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `ALTER TABLE "pricing_cards_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "pages_blocks_pricing_cards_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "pages_blocks_outcome_cta_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "_pages_v_blocks_pricing_cards_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "_pages_v_blocks_outcome_cta_link" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "pages_blocks_who_can_benefit" ADD COLUMN IF NOT EXISTS "_path" text;`,
    `ALTER TABLE "_pages_v_blocks_who_can_benefit" ADD COLUMN IF NOT EXISTS "_path" text;`
  ]

  for (const stmt of statements) {
    try {
      await client.query(stmt)
      console.log('Executed statement successfully!')
    } catch (e) {
      console.error('Error:', e.message)
    }
  }

  await client.end()
}

addPathCols().catch(console.error)
