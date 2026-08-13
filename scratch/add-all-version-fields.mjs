import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function addAllVersionFields() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `ALTER TABLE "_pricing_cards_link_v" ADD COLUMN IF NOT EXISTS "badge" varchar;`,
    `ALTER TABLE "_pricing_cards_link_v" ADD COLUMN IF NOT EXISTS "heading" varchar;`,
    `ALTER TABLE "_pricing_cards_link_v" ADD COLUMN IF NOT EXISTS "description" varchar;`,
    `ALTER TABLE "_pricing_cards_link_v" ADD COLUMN IF NOT EXISTS "block_name" varchar;`,
    `ALTER TABLE "_pricing_cards_link_v" ADD COLUMN IF NOT EXISTS "_uuid" varchar;`,

    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "badge" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "heading" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_heading" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_type" "enum_outcome_cta_link_cta_card_cta_link_type" DEFAULT 'reference';`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_new_tab" boolean;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_url" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_label" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "cta_card_cta_link_appearance" "enum_outcome_cta_link_cta_card_cta_link_appearance" DEFAULT 'default';`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "block_name" varchar;`,
    `ALTER TABLE "_outcome_cta_link_v" ADD COLUMN IF NOT EXISTS "_uuid" varchar;`
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

addAllVersionFields().catch(console.error)
