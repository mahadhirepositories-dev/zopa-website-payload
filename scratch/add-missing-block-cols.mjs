import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function addMissingBlockCols() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `ALTER TABLE "pricing_cards_link" ADD COLUMN IF NOT EXISTS "badge" varchar;`,
    `ALTER TABLE "pricing_cards_link" ADD COLUMN IF NOT EXISTS "heading" varchar;`,
    `ALTER TABLE "pricing_cards_link" ADD COLUMN IF NOT EXISTS "description" varchar;`,
    `ALTER TABLE "pricing_cards_link" ADD COLUMN IF NOT EXISTS "block_name" varchar;`,

    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "badge" varchar;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "heading" varchar;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_heading" varchar;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_type" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_type" DEFAULT 'reference';`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_new_tab" boolean;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_url" varchar;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_label" varchar;`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_appearance" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_appearance" DEFAULT 'default';`,
    `ALTER TABLE "outcome_cta_link" ADD COLUMN IF NOT EXISTS "block_name" varchar;`
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

addMissingBlockCols().catch(console.error)
