import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixOutcomeCardsParentId() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  try {
    await client.query(`ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`)
    console.log('_outcome_cta_link_v_cards._parent_id converted to varchar successfully!')
  } catch (e) {
    console.error('Error converting _outcome_cta_link_v_cards:', e.message)
  }

  await client.end()
}

fixOutcomeCardsParentId().catch(console.error)
