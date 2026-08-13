import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function standardizeAllBlockIdTypes() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const tablesToVarcharId = [
    '_pages_v_blocks_product',
    '_pages_v_blocks_pricing_cards',
    '_pages_v_blocks_pricing_cards_cards',
    '_pages_v_blocks_pricing_cards_cards_features',
    '_pages_v_blocks_recent_clients',
    '_pages_v_blocks_recent_clients_clients',
    '_pages_v_blocks_product_features',
    '_pages_v_blocks_product_statcards',
    '_pages_v_blocks_cta',
    '_pages_v_blocks_cta_links',
    '_pages_v_blocks_content',
    '_pages_v_blocks_content_columns',
    '_pages_v_blocks_media_block',
    '_pages_v_blocks_archive',
    '_pages_v_blocks_form_block'
  ]

  for (const table of tablesToVarcharId) {
    try {
      await client.query(`ALTER TABLE "${table}" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;`)
      console.log(`Converted ${table}.id to varchar successfully!`)
    } catch (e) {
      console.error(`Error converting ${table}.id:`, e.message)
    }
  }

  const tablesToVarcharParentId = [
    '_pages_v_blocks_cta_links',
    '_pages_v_blocks_content_columns',
    '_pages_v_blocks_product_features',
    '_pages_v_blocks_product_statcards',
    '_pages_v_blocks_pricing_cards_cards',
    '_pages_v_blocks_pricing_cards_cards_features',
    '_pages_v_blocks_recent_clients_clients'
  ]

  for (const table of tablesToVarcharParentId) {
    try {
      await client.query(`ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`)
      console.log(`Converted ${table}._parent_id to varchar successfully!`)
    } catch (e) {
      console.error(`Error converting ${table}._parent_id:`, e.message)
    }
  }

  await client.end()
}

standardizeAllBlockIdTypes().catch(console.error)
