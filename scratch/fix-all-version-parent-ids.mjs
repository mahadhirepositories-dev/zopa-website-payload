import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixAllVersionParentIds() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const tables = [
    '_pages_v_blocks_product_features',
    '_pages_v_blocks_product_statcards',
    '_pages_v_blocks_pricing_cards_cards',
    '_pages_v_blocks_pricing_cards_cards_features',
    '_pages_v_blocks_recent_clients_clients',
    '_pages_v_blocks_full_width_banner_links',
    '_pages_v_blocks_about_us_features',
    '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_services_section_services',
    '_pages_v_blocks_how_we_work_steps',
    '_pages_v_blocks_who_can_benefit_items',
    '_pages_v_svc',
    '_svc_v',
    '_svc_v_items',
    '_svc_v_features',
    '_pricing_cards_link_v_cards',
    '_pricing_cards_link_v_cards_features',
    '_outcome_cta_link_v_cards'
  ]

  for (const table of tables) {
    try {
      await client.query(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "${table}_parent_id_fk";`)
      await client.query(`ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`)
      console.log(`Updated ${table}._parent_id to varchar successfully!`)
    } catch (e) {
      console.error(`Error updating ${table}:`, e.message)
    }
  }

  await client.end()
}

fixAllVersionParentIds().catch(console.error)
