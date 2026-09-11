import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const tablesForIdDefault = [
    '_outcome_cta_link_v',
    '_outcome_cta_link_v_cards',
    '_pages_v_blocks_about_section',
    '_pages_v_blocks_about_us',
    '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_about_us_features',
    '_pages_v_blocks_blog_section',
    '_pages_v_blocks_full_width_banner',
    '_pages_v_blocks_full_width_banner_links',
    '_pages_v_blocks_how_we_work',
    '_pages_v_blocks_how_we_work_steps',
    '_pages_v_blocks_interest_form',
    '_pages_v_blocks_outcome_cta_link',
    '_pages_v_blocks_pricing_cards_link',
    '_pages_v_blocks_procurement_solutions',
    '_pages_v_blocks_service_detail_section',
    '_pages_v_blocks_services_section',
    '_pages_v_blocks_services_section_services',
    '_pages_v_blocks_vision_mission',
    '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_who_can_benefit',
    '_pages_v_blocks_who_can_benefit_items',
    '_pages_v_svc',
    '_pages_v_svc_features',
    '_pricing_cards_link_v',
    '_pricing_cards_link_v_cards',
    '_pricing_cards_link_v_cards_features',
    '_pricing_cards_link_v_features',
    '_svc_v',
    '_svc_v_features',
    '_svc_v_items',
    'pages_blocks_archive',
    'pages_blocks_service_detail_section',
    'pages_blocks_services_section',
    'pages_blocks_services_section_services',
    'pages_blocks_vision_mission',
    'pages_blocks_vision_mission_values',
    'header_nav_items',
    'header_nav_items_children',
    'products_after_approval',
    'outcome_cta_link',
    'outcome_cta_link_cards',
    'pricing_cards_link',
    'pricing_cards_link_cards',
    'pricing_cards_link_cards_features',
    'pricing_cards_link_features',
    'svc',
    'svc_features',
    'svc_items',
  ]

  for (const table of tablesForIdDefault) {
    try {
      await db.execute(sql.raw(`ALTER TABLE "${table}" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;`))
    } catch (e: any) {
      if (
        !e?.message?.includes('does not exist') &&
        !e?.message?.includes('already')
      ) {
        throw e
      }
    }
  }

  const tablesForParentIdVarchar = [
    '_pricing_cards_link_v_cards',
    '_pricing_cards_link_v_cards_features',
    '_pricing_cards_link_v_features',
    '_svc_v_features',
    '_svc_v_items',
  ]

  for (const table of tablesForParentIdVarchar) {
    try {
      await db.execute(sql.raw(`ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`))
    } catch (e: any) {
      if (
        !e?.message?.includes('does not exist') &&
        !e?.message?.includes('already')
      ) {
        throw e
      }
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op
}
