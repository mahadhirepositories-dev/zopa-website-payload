import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`SELECT pg_advisory_xact_lock(2026081210);`)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_svc_display_type" AS ENUM('item', 'feature');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__svc_v_display_type" AS ENUM('item', 'feature');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`ALTER TABLE "svc" ADD COLUMN IF NOT EXISTS "sub_heading" varchar;`)
  await db.execute(sql`ALTER TABLE "svc" ADD COLUMN IF NOT EXISTS "display_type" "enum_svc_display_type" DEFAULT 'item';`)
  await db.execute(sql`ALTER TABLE "_svc_v" ADD COLUMN IF NOT EXISTS "sub_heading" varchar;`)
  await db.execute(sql`ALTER TABLE "_svc_v" ADD COLUMN IF NOT EXISTS "display_type" "enum__svc_v_display_type" DEFAULT 'item';`)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "svc_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );
  `)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_svc_v_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar,
      "_uuid" varchar
    );
  `)
  await db.execute(sql`ALTER TABLE "svc_features" ADD COLUMN IF NOT EXISTS "title" varchar;`)
  await db.execute(sql`ALTER TABLE "svc_features" ADD COLUMN IF NOT EXISTS "description" varchar;`)
  await db.execute(sql`ALTER TABLE "_svc_v_features" ADD COLUMN IF NOT EXISTS "title" varchar;`)
  await db.execute(sql`ALTER TABLE "_svc_v_features" ADD COLUMN IF NOT EXISTS "description" varchar;`)

  // 2. WhoCanBenefit main & version tables
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pages_blocks_who_can_benefit" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "label" varchar DEFAULT 'Who can benefit:',
        "block_name" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pages_blocks_who_can_benefit_items" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar NOT NULL
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pages_v_blocks_who_can_benefit" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "label" varchar DEFAULT 'Who can benefit:',
        "block_name" varchar,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pages_v_blocks_who_can_benefit_items" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "text" varchar NOT NULL,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  // 3. PricingComparison (pricing_cards_link) main & version tables
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pages_blocks_pricing_cards_link" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "badge" varchar,
        "heading" varchar,
        "description" varchar,
        "block_name" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pricing_cards_link" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "tagline" varchar,
        "description" varchar,
        "cta_link_type" "enum_pages_blocks_pricing_cards_link_cards_cta_link_type" DEFAULT 'reference',
        "cta_link_new_tab" boolean,
        "cta_link_url" varchar,
        "cta_link_label" varchar,
        "cta_link_appearance" "enum_pages_blocks_pricing_cards_link_cards_cta_link_appearance" DEFAULT 'default'
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pricing_cards_link_features" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "feature" varchar NOT NULL
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pages_v_blocks_pricing_cards_link" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "badge" varchar,
        "heading" varchar,
        "description" varchar,
        "block_name" varchar,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pricing_cards_link_v" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "tagline" varchar,
        "description" varchar,
        "cta_link_type" "enum_pages_blocks_pricing_cards_link_cards_cta_link_type" DEFAULT 'reference',
        "cta_link_new_tab" boolean,
        "cta_link_url" varchar,
        "cta_link_label" varchar,
        "cta_link_appearance" "enum_pages_blocks_pricing_cards_link_cards_cta_link_appearance" DEFAULT 'default',
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pricing_cards_link_v_features" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "feature" varchar NOT NULL,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  // 4. OutcomeSection (outcome_cta_link) main & version tables
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pages_blocks_outcome_cta_link" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "badge" varchar,
        "heading" varchar NOT NULL,
        "cta_card_heading" varchar DEFAULT 'Call Us Today to Schedule to understand more!',
        "cta_card_cta_link_type" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_type" DEFAULT 'reference',
        "cta_card_cta_link_new_tab" boolean,
        "cta_card_cta_link_url" varchar,
        "cta_card_cta_link_label" varchar,
        "cta_card_cta_link_appearance" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_appearance" DEFAULT 'default',
        "block_name" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "outcome_cta_link" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar NOT NULL,
        "description" varchar NOT NULL
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_pages_v_blocks_outcome_cta_link" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "_path" text NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "badge" varchar,
        "heading" varchar NOT NULL,
        "cta_card_heading" varchar DEFAULT 'Call Us Today to Schedule to understand more!',
        "cta_card_cta_link_type" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_type" DEFAULT 'reference',
        "cta_card_cta_link_new_tab" boolean,
        "cta_card_cta_link_url" varchar,
        "cta_card_cta_link_label" varchar,
        "cta_card_cta_link_appearance" "enum_pages_blocks_outcome_cta_link_cta_card_cta_link_appearance" DEFAULT 'default',
        "block_name" varchar,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_outcome_cta_link_v" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "icon" varchar,
        "title" varchar NOT NULL,
        "description" varchar NOT NULL,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_outcome_cta_link_v" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_blocks_outcome_cta_link" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "outcome_cta_link" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_blocks_outcome_cta_link" CASCADE;`)

  await db.execute(sql`DROP TABLE IF EXISTS "_pricing_cards_link_v_features" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pricing_cards_link_v" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_blocks_pricing_cards_link" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pricing_cards_link_features" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pricing_cards_link" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_blocks_pricing_cards_link" CASCADE;`)

  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_blocks_who_can_benefit_items" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "_pages_v_blocks_who_can_benefit" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_blocks_who_can_benefit_items" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "pages_blocks_who_can_benefit" CASCADE;`)
}
