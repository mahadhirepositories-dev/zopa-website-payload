import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const statements = [
    // 1. OutcomeSection (main & version table)
    `ALTER TABLE "outcome_cta_link" 
       ALTER COLUMN "cta_card_cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_card_cta_link_type" TYPE "enum_outcome_cta_link_cta_card_cta_link_type" 
         USING "cta_card_cta_link_type"::text::"enum_outcome_cta_link_cta_card_cta_link_type",
       ALTER COLUMN "cta_card_cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "outcome_cta_link" 
       ALTER COLUMN "cta_card_cta_link_appearance" DROP DEFAULT,
       ALTER COLUMN "cta_card_cta_link_appearance" TYPE "enum_outcome_cta_link_cta_card_cta_link_appearance" 
         USING "cta_card_cta_link_appearance"::text::"enum_outcome_cta_link_cta_card_cta_link_appearance",
       ALTER COLUMN "cta_card_cta_link_appearance" SET DEFAULT 'default'`,

    `ALTER TABLE "_outcome_cta_link_v" 
       ALTER COLUMN "cta_card_cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_card_cta_link_type" TYPE "enum__outcome_cta_link_v_cta_card_cta_link_type" 
         USING "cta_card_cta_link_type"::text::"enum__outcome_cta_link_v_cta_card_cta_link_type",
       ALTER COLUMN "cta_card_cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "_outcome_cta_link_v" 
       ALTER COLUMN "cta_card_cta_link_appearance" DROP DEFAULT,
       ALTER COLUMN "cta_card_cta_link_appearance" TYPE "enum__outcome_cta_link_v_cta_card_cta_link_appearance" 
         USING "cta_card_cta_link_appearance"::text::"enum__outcome_cta_link_v_cta_card_cta_link_appearance",
       ALTER COLUMN "cta_card_cta_link_appearance" SET DEFAULT 'default'`,

    // 2. PricingCards link tables
    `ALTER TABLE "pricing_cards_link_cards" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum_pricing_cards_link_cards_cta_link_type" 
         USING "cta_link_type"::text::"enum_pricing_cards_link_cards_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "pricing_cards_link_cards" 
       ALTER COLUMN "cta_link_appearance" DROP DEFAULT,
       ALTER COLUMN "cta_link_appearance" TYPE "enum_pricing_cards_link_cards_cta_link_appearance" 
         USING "cta_link_appearance"::text::"enum_pricing_cards_link_cards_cta_link_appearance",
       ALTER COLUMN "cta_link_appearance" SET DEFAULT 'default'`,

    `ALTER TABLE "_pricing_cards_link_v_cards" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum__pricing_cards_link_v_cards_cta_link_type" 
         USING "cta_link_type"::text::"enum__pricing_cards_link_v_cards_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "_pricing_cards_link_v_cards" 
       ALTER COLUMN "cta_link_appearance" DROP DEFAULT,
       ALTER COLUMN "cta_link_appearance" TYPE "enum__pricing_cards_link_v_cards_cta_link_appearance" 
         USING "cta_link_appearance"::text::"enum__pricing_cards_link_v_cards_cta_link_appearance",
       ALTER COLUMN "cta_link_appearance" SET DEFAULT 'default'`,

    // 3. Service Detail (svc) tables
    `ALTER TABLE "svc" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum_svc_cta_link_type" 
         USING "cta_link_type"::text::"enum_svc_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "_svc_v" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum__svc_v_cta_link_type" 
         USING "cta_link_type"::text::"enum__svc_v_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "_svc_v" 
       ALTER COLUMN "cta_link_appearance" DROP DEFAULT,
       ALTER COLUMN "cta_link_appearance" TYPE "enum__svc_v_cta_link_appearance" 
         USING "cta_link_appearance"::text::"enum__svc_v_cta_link_appearance",
       ALTER COLUMN "cta_link_appearance" SET DEFAULT 'default'`,

    `ALTER TABLE "_svc_v" 
       ALTER COLUMN "layout" DROP DEFAULT,
       ALTER COLUMN "layout" TYPE "enum__svc_v_layout" 
         USING "layout"::text::"enum__svc_v_layout",
       ALTER COLUMN "layout" SET DEFAULT 'imageLeft'`,

    // 4. Custom block link enum fixes
    `ALTER TABLE "pages_blocks_about_us" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum_pages_blocks_about_us_cta_link_type" 
         USING "cta_link_type"::text::"enum_pages_blocks_about_us_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "pages_blocks_blog_section" 
       ALTER COLUMN "view_more_link_type" DROP DEFAULT,
       ALTER COLUMN "view_more_link_type" TYPE "enum_pages_blocks_blog_section_view_more_link_type" 
         USING "view_more_link_type"::text::"enum_pages_blocks_blog_section_view_more_link_type",
       ALTER COLUMN "view_more_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "pages_blocks_full_width_banner_links" 
       ALTER COLUMN "link_type" DROP DEFAULT,
       ALTER COLUMN "link_type" TYPE "enum_pages_blocks_full_width_banner_links_link_type" 
         USING "link_type"::text::"enum_pages_blocks_full_width_banner_links_link_type",
       ALTER COLUMN "link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "pages_blocks_procurement_solutions" 
       ALTER COLUMN "cta_link_type" DROP DEFAULT,
       ALTER COLUMN "cta_link_type" TYPE "enum_pages_blocks_procurement_solutions_cta_link_type" 
         USING "cta_link_type"::text::"enum_pages_blocks_procurement_solutions_cta_link_type",
       ALTER COLUMN "cta_link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "pages_blocks_services_section_services" 
       ALTER COLUMN "link_type" DROP DEFAULT,
       ALTER COLUMN "link_type" TYPE "enum_pages_blocks_services_section_services_link_type" 
         USING "link_type"::text::"enum_pages_blocks_services_section_services_link_type",
       ALTER COLUMN "link_type" SET DEFAULT 'reference'`,

    // 5. Header & Footer enum fixes
    `ALTER TABLE "footer" 
       ALTER COLUMN "cta_button_type" DROP DEFAULT,
       ALTER COLUMN "cta_button_type" TYPE "enum_footer_cta_button_type" 
         USING "cta_button_type"::text::"enum_footer_cta_button_type",
       ALTER COLUMN "cta_button_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "footer_columns_links" 
       ALTER COLUMN "link_type" DROP DEFAULT,
       ALTER COLUMN "link_type" TYPE "enum_footer_columns_links_link_type" 
         USING "link_type"::text::"enum_footer_columns_links_link_type",
       ALTER COLUMN "link_type" SET DEFAULT 'reference'`,

    `ALTER TABLE "header_nav_items_children" 
       ALTER COLUMN "link_type" DROP DEFAULT,
       ALTER COLUMN "link_type" TYPE "enum_header_nav_items_children_link_type" 
         USING "link_type"::text::"enum_header_nav_items_children_link_type",
       ALTER COLUMN "link_type" SET DEFAULT 'reference'`,
  ]

  for (const statement of statements) {
    try {
      await db.execute(sql.raw(statement))
    } catch (e: any) {
      if (
        !e?.message?.includes('already') && 
        !e?.message?.includes('does not exist') &&
        !e?.message?.includes('cannot be cast')
      ) {
        throw e
      }
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op
}
