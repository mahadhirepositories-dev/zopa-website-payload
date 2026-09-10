import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // These ALTER TABLE statements drop NOT NULL constraints that were causing
  // autosave 400s when custom blocks are added with empty fields.
  // These were already applied manually to the live DB; this migration
  // ensures they are tracked and will be applied idempotently on fresh deploys.

  const statements = [
    `ALTER TABLE "pages_blocks_outcome_cta_link" ALTER COLUMN "heading" DROP NOT NULL`,
    `ALTER TABLE "_pages_v_blocks_outcome_cta_link" ALTER COLUMN "heading" DROP NOT NULL`,
    `ALTER TABLE "outcome_cta_link" ALTER COLUMN "title" DROP NOT NULL`,
    `ALTER TABLE "outcome_cta_link" ALTER COLUMN "description" DROP NOT NULL`,
    `ALTER TABLE "_outcome_cta_link_v" ALTER COLUMN "title" DROP NOT NULL`,
    `ALTER TABLE "_outcome_cta_link_v" ALTER COLUMN "description" DROP NOT NULL`,
    `ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "title" DROP NOT NULL`,
    `ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "description" DROP NOT NULL`,
    `ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "title" DROP NOT NULL`,
    `ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "description" DROP NOT NULL`,
    `ALTER TABLE "pages_blocks_who_can_benefit_items" ALTER COLUMN "text" DROP NOT NULL`,
    `ALTER TABLE "_pages_v_blocks_who_can_benefit_items" ALTER COLUMN "text" DROP NOT NULL`,
    `ALTER TABLE "pricing_cards_link" ALTER COLUMN "name" DROP NOT NULL`,
    `ALTER TABLE "_pricing_cards_link_v" ALTER COLUMN "name" DROP NOT NULL`,
    `ALTER TABLE "pricing_cards_link_cards" ALTER COLUMN "name" DROP NOT NULL`,
    `ALTER TABLE "_pricing_cards_link_v_cards" ALTER COLUMN "name" DROP NOT NULL`,
    `ALTER TABLE "pricing_cards_link_features" ALTER COLUMN "feature" DROP NOT NULL`,
    `ALTER TABLE "_pricing_cards_link_v_features" ALTER COLUMN "feature" DROP NOT NULL`,
    `ALTER TABLE "pricing_cards_link_cards_features" ALTER COLUMN "feature" DROP NOT NULL`,
    `ALTER TABLE "_pricing_cards_link_v_cards_features" ALTER COLUMN "feature" DROP NOT NULL`,
  ]

  for (const statement of statements) {
    try {
      await db.execute(sql.raw(statement))
    } catch (e: any) {
      // Column may already be nullable — safe to ignore
      if (!e?.message?.includes('already') && !e?.message?.includes('does not exist')) {
        throw e
      }
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op: restoring NOT NULL on columns that may now have NULL values would fail
}
