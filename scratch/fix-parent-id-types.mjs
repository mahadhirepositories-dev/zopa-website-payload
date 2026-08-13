import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixParentIdTypes() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const tablesToFix = [
    '_pages_v_blocks_product_features',
    '_pages_v_blocks_product_statcards',
    '_pages_v_blocks_pricing_cards_cards',
    '_pages_v_blocks_pricing_cards_cards_features',
    '_pages_v_blocks_recent_clients_clients'
  ]

  for (const table of tablesToFix) {
    try {
      await client.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "${table}_parent_id_fk";`)
      await client.query(`ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`)
      console.log(`Updated ${table}._parent_id to varchar`)
    } catch (e) {
      console.log(`Could not update ${table}._parent_id:`, e.message)
    }
  }

  await client.end()
}

fixParentIdTypes().catch(err => {
  console.error(err)
  process.exit(1)
})
