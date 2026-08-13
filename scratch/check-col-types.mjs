import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkColumnTypes() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const tables = [
    'pages_blocks_who_can_benefit',
    'pages_blocks_who_can_benefit_items',
    'pages_blocks_pricing_cards_link',
    'pricing_cards_link',
    'pricing_cards_link_features',
    'pages_blocks_outcome_cta_link',
    'outcome_cta_link',
    'svc',
    'svc_items',
    'svc_features'
  ]

  for (const table of tables) {
    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = $1 AND column_name IN ('id', '_parent_id');
    `, [table])
    console.log(`Table ${table}:`, res.rows)
  }

  await client.end()
}

checkColumnTypes().catch(err => {
  console.error(err)
  process.exit(1)
})
