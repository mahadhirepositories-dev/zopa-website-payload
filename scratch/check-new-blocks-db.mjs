import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkNewBlockTables() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const tables = [
    // Main block tables
    'pages_blocks_pricing_cards_link',
    'pages_blocks_pricing_cards_link_cards',
    'pages_blocks_pricing_cards_link_cards_features',
    'pages_blocks_who_can_benefit',
    'pages_blocks_who_can_benefit_items',
    'pages_blocks_outcome_cta_link',
    'pages_blocks_outcome_cta_link_cards',

    // Version shadow tables
    '_pages_v_blocks_pricing_cards_link',
    '_pricing_cards_link_v',
    '_pricing_cards_link_v_cards',
    '_pricing_cards_link_v_cards_features',
    '_pages_v_blocks_who_can_benefit',
    '_pages_v_blocks_who_can_benefit_items',
    '_pages_v_blocks_outcome_cta_link',
    '_outcome_cta_link_v',
    '_outcome_cta_link_v_cards',
  ]

  console.log('Checking table existence in Supabase...')
  const existing = []
  const missing = []

  for (const t of tables) {
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1;", [t])
    if (res.rows.length > 0) {
      existing.push(t)
    } else {
      missing.push(t)
    }
  }

  console.log('EXISTING tables:', existing)
  console.log('MISSING tables:', missing)

  await client.end()
}

checkNewBlockTables().catch(err => {
  console.error(err)
  process.exit(1)
})
