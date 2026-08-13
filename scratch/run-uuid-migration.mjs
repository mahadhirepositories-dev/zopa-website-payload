import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function runMigration() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const tables = [
    '_pages_v_blocks_full_width_banner_links',
    '_pages_v_blocks_about_us_features',
    '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_services_section_services',
    '_pages_v_svc_features',
    '_pages_v_blocks_how_we_work_steps',
    '_pages_v_svc',
  ]

  for (const table of tables) {
    await client.query(`ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "_uuid" varchar;`)
    console.log(`Added _uuid to ${table}`)
  }

  // Record migration in payload_migrations table
  await client.query(`
    INSERT INTO payload_migrations (name, batch)
    VALUES ('20260808_230000_add_uuid_to_version_tables', 1)
    ON CONFLICT DO NOTHING;
  `)
  console.log('Migration recorded in payload_migrations!')

  await client.end()
}

runMigration().catch(err => {
  console.error(err)
  process.exit(1)
})
