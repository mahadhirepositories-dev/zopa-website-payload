import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * The `aboutSection` block declares `content` as a `textarea` (varchar), and the
 * base table `pages_blocks_about_section` matches. The version table
 * `_pages_v_blocks_about_section` was created with `content` as `jsonb`.
 *
 * Drafts and autosaves write to the version table, so editing the Content field
 * persisted as NULL while the PATCH still returned 200 - the text was silently
 * discarded on every save.
 *
 * Verified before writing: the column held 3 rows, all NULL, so the type change
 * is lossless. `#>>'{}'` is used so any stray jsonb string would be unwrapped to
 * its text value rather than left JSON-quoted.
 *
 * Deliberately not wrapped in try/catch: if this fails, it must surface.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Idempotent: only convert while the column is still jsonb. Re-running the
  // jsonb-only `#>> '{}'` operator against a varchar column would error.
  await db.execute(
    sql.raw(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = '_pages_v_blocks_about_section'
            AND column_name = 'content'
            AND data_type = 'jsonb'
        ) THEN
          ALTER TABLE "_pages_v_blocks_about_section"
            ALTER COLUMN "content" TYPE varchar USING "content" #>> '{}';
        END IF;
      END $$;
    `),
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql.raw(`
      ALTER TABLE "_pages_v_blocks_about_section"
        ALTER COLUMN "content" TYPE jsonb USING to_jsonb("content");
    `),
  )
}
