import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function debugPagesList() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  // Query 1: pages collection query
  try {
    const q1 = `SELECT id, title, slug, _status, updated_at, created_at FROM pages ORDER BY updated_at DESC LIMIT 10;`
    const res1 = await client.query(q1)
    console.log('Pages count:', res1.rows.length)
  } catch (err1) {
    console.error('Q1 (pages) Error:', err1.message)
  }

  // Query 2: _pages_v collection query (Payload admin drafts list query)
  try {
    const q2 = `SELECT id, parent_id, version_title, version_slug, version__status, updated_at, created_at FROM _pages_v ORDER BY updated_at DESC LIMIT 10;`
    const res2 = await client.query(q2)
    console.log('_pages_v count:', res2.rows.length)
  } catch (err2) {
    console.error('Q2 (_pages_v) Error:', err2.message)
  }

  // Query 3: Full Payload SELECT query on _pages_v with version sub-tables
  try {
    const q3 = `
      select "_pages_v"."id", "_pages_v"."parent_id", "_pages_v"."version_title", "_pages_v"."version_slug", "_pages_v"."version__status", "_pages_v"."created_at", "_pages_v"."updated_at",
      "_pages_v_blocks_pricing_cards_link"."data" as "_blocks_pricingComparison",
      "_pages_v_blocks_who_can_benefit"."data" as "_blocks_whoCanBenefit",
      "_pages_v_blocks_outcome_cta_link"."data" as "_blocks_outcomeSection"
      from "_pages_v" "_pages_v"
      left join lateral (select coalesce(json_agg(json_build_array("_pages_v_blocks_pricing_cards_link"."_order", "_pages_v_blocks_pricing_cards_link"."_path", "_pages_v_blocks_pricing_cards_link"."id", "_pages_v_blocks_pricing_cards_link"."_uuid") order by "_pages_v_blocks_pricing_cards_link"."_order" asc), '[]'::json) as "data" from "_pages_v_blocks_pricing_cards_link" "_pages_v_blocks_pricing_cards_link" where "_pages_v_blocks_pricing_cards_link"."_parent_id" = "_pages_v"."id") "_pages_v_blocks_pricing_cards_link" on true
      left join lateral (select coalesce(json_agg(json_build_array("_pages_v_blocks_who_can_benefit"."_order", "_pages_v_blocks_who_can_benefit"."_path", "_pages_v_blocks_who_can_benefit"."id", "_pages_v_blocks_who_can_benefit"."_uuid") order by "_pages_v_blocks_who_can_benefit"."_order" asc), '[]'::json) as "data" from "_pages_v_blocks_who_can_benefit" "_pages_v_blocks_who_can_benefit" where "_pages_v_blocks_who_can_benefit"."_parent_id" = "_pages_v"."id") "_pages_v_blocks_who_can_benefit" on true
      left join lateral (select coalesce(json_agg(json_build_array("_pages_v_blocks_outcome_cta_link"."_order", "_pages_v_blocks_outcome_cta_link"."_path", "_pages_v_blocks_outcome_cta_link"."id", "_pages_v_blocks_outcome_cta_link"."_uuid") order by "_pages_v_blocks_outcome_cta_link"."_order" asc), '[]'::json) as "data" from "_pages_v_blocks_outcome_cta_link" "_pages_v_blocks_outcome_cta_link" where "_pages_v_blocks_outcome_cta_link"."_parent_id" = "_pages_v"."id") "_pages_v_blocks_outcome_cta_link" on true
      limit 10;
    `
    const res3 = await client.query(q3)
    console.log('Full _pages_v query SUCCESS! Rows:', res3.rows.length)
  } catch (err3) {
    console.error('Q3 Error:', err3.message)
  }

  await client.end()
}

debugPagesList().catch(console.error)
