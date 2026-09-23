import 'dotenv/config'
import pg from 'pg'

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

// All mismatched columns classified: expected int-ish but actual varchar
const targets = [
  ['pricing_cards_link','_parent_id'], ['outcome_cta_link','_parent_id'],
  ['_pages_v_blocks_product_features','_parent_id'], ['_pages_v_blocks_product_statcards','_parent_id'],
  ['_pages_v_blocks_pricing_cards_cards_features','_parent_id'], ['_pages_v_blocks_pricing_cards_cards','_parent_id'],
  ['_pages_v_blocks_recent_clients_clients','_parent_id'],
  ['_pages_v_blocks_full_width_banner_links','_parent_id'], ['_pages_v_blocks_full_width_banner_links','id'],
  ['_pages_v_blocks_full_width_banner','id'], ['_pages_v_blocks_about_section','id'],
  ['_pages_v_blocks_about_us_features','_parent_id'], ['_pages_v_blocks_about_us_features','id'],
  ['_pages_v_blocks_about_us_card_points','_parent_id'], ['_pages_v_blocks_about_us_card_points','id'],
  ['_pages_v_blocks_about_us','id'], ['_pages_v_blocks_vision_mission_values','_parent_id'],
  ['_pages_v_blocks_vision_mission_values','id'], ['_pages_v_blocks_vision_mission','id'],
  ['_pages_v_blocks_procurement_solutions','id'], ['_pages_v_blocks_services_section_services','_parent_id'],
  ['_pages_v_blocks_services_section_services','id'], ['_pages_v_blocks_services_section','id'],
  ['_svc_v_items','_parent_id'], ['_svc_v_items','id'], ['_svc_v_features','_parent_id'], ['_svc_v_features','id'],
  ['_svc_v','_parent_id'], ['_svc_v','id'], ['_svc_v','media_id'],
  ['_pages_v_blocks_service_detail_section','id'], ['_pages_v_blocks_how_we_work_steps','_parent_id'],
  ['_pages_v_blocks_how_we_work_steps','id'], ['_pages_v_blocks_how_we_work','id'],
  ['_pages_v_blocks_interest_form','id'], ['_pages_v_blocks_who_can_benefit_items','_parent_id'],
  ['_pages_v_blocks_who_can_benefit_items','id'], ['_pages_v_blocks_who_can_benefit','id'],
  ['_pricing_cards_link_v_cards','_parent_id'], ['_pricing_cards_link_v','_parent_id'], ['_pricing_cards_link_v','id'],
  ['_outcome_cta_link_v','_parent_id'], ['_outcome_cta_link_v','id'],
  ['_pages_v_blocks_blog_section','id'],
]

console.log('table.column | rows | non-numeric | sample values')
for (const [t, c] of targets) {
  const exists = await client.query("SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 AND column_name=$2", [t, c])
  if (!exists.rows.length) { console.log(`${t}.${c} | COLUMN MISSING`); continue }
  const cnt = await client.query(`SELECT count(*)::int n, count(*) FILTER (WHERE "${c}" IS NOT NULL AND "${c}" !~ '^[0-9]+$')::int bad FROM "${t}"`)
  const sample = await client.query(`SELECT DISTINCT "${c}"::text FROM "${t}" WHERE "${c}" IS NOT NULL LIMIT 3`)
  console.log(`${t}.${c} | ${cnt.rows[0].n} | ${cnt.rows[0].bad} | ${sample.rows.map(r => r[c]).join(', ')}`)
}
await client.end()
