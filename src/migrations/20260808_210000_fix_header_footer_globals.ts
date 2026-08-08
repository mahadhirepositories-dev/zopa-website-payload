import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`SELECT pg_advisory_xact_lock(202608082100);`)
  // ─── Step 1: Make NOT NULL link label columns nullable ───────────────────
  // These cause 500 when saving globals/blocks without filling every link label
  await db.execute(sql`
    ALTER TABLE "header" ALTER COLUMN "ctalink_label" DROP NOT NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  `)
  await db.execute(sql`
    ALTER TABLE "footer_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  `)

  // ─── Step 2: New enum types ───────────────────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_nav_items_children_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_footer_cta_button_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 3: header_nav_items_children table ─────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_nav_items_children" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_nav_items_children_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_nav_items_children"
        ADD CONSTRAINT "header_nav_items_children_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "header_nav_items"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 4: Add missing columns to footer table ─────────────────────────
  await db.execute(sql`
    ALTER TABLE "footer"
      ADD COLUMN IF NOT EXISTS "cta_heading" varchar,
      ADD COLUMN IF NOT EXISTS "cta_description" varchar,
      ADD COLUMN IF NOT EXISTS "cta_button_type" "enum_footer_cta_button_link_type" DEFAULT 'reference',
      ADD COLUMN IF NOT EXISTS "cta_button_new_tab" boolean,
      ADD COLUMN IF NOT EXISTS "cta_button_url" varchar,
      ADD COLUMN IF NOT EXISTS "cta_button_label" varchar,
      ADD COLUMN IF NOT EXISTS "cta_logo_id" integer,
      ADD COLUMN IF NOT EXISTS "contact_address" varchar,
      ADD COLUMN IF NOT EXISTS "contact_phone" varchar,
      ADD COLUMN IF NOT EXISTS "contact_email" varchar,
      ADD COLUMN IF NOT EXISTS "copyright" varchar;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "footer"
        ADD CONSTRAINT "footer_cta_logo_id_media_id_fk"
        FOREIGN KEY ("cta_logo_id") REFERENCES "media"("id")
        ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 5: footer_columns table ────────────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_columns" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "footer_columns"
        ADD CONSTRAINT "footer_columns_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "footer"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 6: footer_columns_links table ──────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_columns_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "footer_columns_links"
        ADD CONSTRAINT "footer_columns_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "footer_columns"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 7: footer_social_links table ───────────────────────────────────
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footer_social_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "platform" varchar NOT NULL,
      "url" varchar NOT NULL
    );
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "footer_social_links"
        ADD CONSTRAINT "footer_social_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "footer"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 8: footer_rels — add media_id column if missing ────────────────
  await db.execute(sql`
    ALTER TABLE "footer_rels"
      ADD COLUMN IF NOT EXISTS "media_id" integer;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "footer_rels"
        ADD CONSTRAINT "footer_rels_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 9: header_rels — add media_id column if missing ────────────────
  await db.execute(sql`
    ALTER TABLE "header_rels"
      ADD COLUMN IF NOT EXISTS "media_id" integer;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_rels"
        ADD CONSTRAINT "header_rels_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "footer_social_links" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footer_columns_links" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footer_columns" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "header_nav_items_children" CASCADE;`)
  await db.execute(sql`
    ALTER TABLE "footer"
      DROP COLUMN IF EXISTS "cta_heading",
      DROP COLUMN IF EXISTS "cta_description",
      DROP COLUMN IF EXISTS "cta_button_type",
      DROP COLUMN IF EXISTS "cta_button_new_tab",
      DROP COLUMN IF EXISTS "cta_button_url",
      DROP COLUMN IF EXISTS "cta_button_label",
      DROP COLUMN IF EXISTS "cta_logo_id",
      DROP COLUMN IF EXISTS "contact_address",
      DROP COLUMN IF EXISTS "contact_phone",
      DROP COLUMN IF EXISTS "contact_email",
      DROP COLUMN IF EXISTS "copyright";
  `)
  await db.execute(sql`
    ALTER TABLE "header" ALTER COLUMN "ctalink_label" SET NOT NULL;
    ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
    ALTER TABLE "footer_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  `)
}
