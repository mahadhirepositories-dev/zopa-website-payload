import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * `src/collections/Media.ts` mirrors uploaded file binaries into a raw
 * `media_files` table via afterChange/afterDelete hooks. That table is not part
 * of Payload's generated schema, so `migrate:create` never includes it — it
 * previously had to be created by hand on every environment.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "media_files" (
      "filename" varchar PRIMARY KEY NOT NULL,
      "mime_type" varchar,
      "data" bytea,
      "updated_at" timestamp DEFAULT now()
    );
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "media_files";`)
}
