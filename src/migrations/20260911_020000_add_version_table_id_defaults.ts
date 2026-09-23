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
    // Only set the uuid default when id is actually a text/varchar column;
    // on hybrid (push-era) schemas some tables still have integer serial ids.
    await db.execute(sql.raw(`
      DO $mig$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = '${table}'
            AND column_name = 'id'
            AND data_type IN ('text', 'character varying')
        ) THEN
          ALTER TABLE "${table}" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text;
        END IF;
      END $mig$;
    `))
  }

  const tablesForParentIdVarchar = [
    '_pricing_cards_link_v_cards',
    '_pricing_cards_link_v_cards_features',
    '_pricing_cards_link_v_features',
    '_svc_v_features',
    '_svc_v_items',
  ]

  for (const table of tablesForParentIdVarchar) {
    // Only convert when _parent_id is still integer; skip when already varchar.
    await db.execute(sql.raw(`
      DO $mig$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = '${table}'
            AND column_name = '_parent_id'
            AND data_type = 'integer'
        ) THEN
          BEGIN
            ALTER TABLE "${table}" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;
          EXCEPTION WHEN OTHERS THEN NULL;
          END;
        END IF;
      END $mig$;
    `))
    // Re-adding the dependent FK may be impossible on hybrid schemas where the
    // parent id type differs; the config-generated sync migration re-establishes
    // correct constraints, so treat implementation failures as non-fatal.
    await db.execute(sql.raw(`
      DO $fk$
      BEGIN
        ALTER TABLE "${table}" ADD CONSTRAINT "${table}_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
      EXCEPTION WHEN duplicate_object OR datatype_mismatch OR undefined_table OR undefined_column OR feature_not_supported THEN NULL;
      END $fk$;
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op
}
