import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Add the `content` column to the Terms and Conditions block tables.
 *
 * Root cause: the block in `src/blocks/Termsandconditions/config.ts` was
 * restructured from a nested `fields` blocks array to a single `content`
 * richText field. Payload now selects `content` from both the main block table
 * (`pages_blocks_terms_and_conditions`) and its version twin
 * (`_pages_v_blocks_terms_and_conditions`), but no migration was generated, so
 * the admin Pages list query (draft: true, which joins the version tables)
 * fails with `column "content" does not exist` -> "Failed query".
 *
 * Column type matches Payload's own DDL for richText fields in block tables
 * (verified against `pages_blocks_cta.rich_text` / `_pages_v_blocks_cta.rich_text`:
 * jsonb, nullable, no default).
 */

const TABLES = [
  'pages_blocks_terms_and_conditions',
  '_pages_v_blocks_terms_and_conditions',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(sql.raw(`
      ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "content" jsonb;
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of TABLES) {
    await db.execute(sql.raw(`
      ALTER TABLE "${table}" DROP COLUMN IF EXISTS "content";
    `))
  }
}