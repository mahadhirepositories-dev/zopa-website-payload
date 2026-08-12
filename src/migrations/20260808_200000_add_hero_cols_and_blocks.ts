import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`SELECT pg_advisory_xact_lock(202608082000);`)
  // ─── Step 1: Add 'fullwidth' to existing hero type enums ──────────────────
  // ALTER TYPE ... ADD VALUE is idempotent-safe only via DO block
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE IF NOT EXISTS 'fullwidth';
    EXCEPTION WHEN others THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE IF NOT EXISTS 'fullwidth';
    EXCEPTION WHEN others THEN NULL; END $$;
  `)

  // ─── Step 2: Add missing columns to pages table ───────────────────────────
  await db.execute(sql`
    ALTER TABLE "pages"
      ADD COLUMN IF NOT EXISTS "hero_logo_id" integer,
      ADD COLUMN IF NOT EXISTS "hero_heading" varchar;
  `)

  // ─── Step 3: Add missing columns to _pages_v table ───────────────────────
  await db.execute(sql`
    ALTER TABLE "_pages_v"
      ADD COLUMN IF NOT EXISTS "version_hero_logo_id" integer,
      ADD COLUMN IF NOT EXISTS "version_hero_heading" varchar;
  `)

  // ─── Step 4: New enum types for new blocks ────────────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_blog_section_view_more_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_blog_section_view_more_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_full_width_banner_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_full_width_banner_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_about_us_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_about_us_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_procurement_solutions_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_section_services_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_svc_layout" AS ENUM('imageLeft', 'imageRight');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_svc_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_svc_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_interest_form_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // _pages_v versions of new enums
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_blog_section_view_more_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_full_width_banner_links_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_about_us_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_about_us_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_procurement_solutions_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_section_services_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_svc_layout" AS ENUM('imageLeft', 'imageRight');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_svc_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_svc_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // ─── Step 5: Create new block tables (all with IF NOT EXISTS) ─────────────

  // pages_blocks_blog_section
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_blog_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "title" varchar,
      "limit" numeric DEFAULT 3,
      "view_more_link_type" "enum_pages_blocks_blog_section_view_more_link_type" DEFAULT 'reference',
      "view_more_link_new_tab" boolean,
      "view_more_link_url" varchar,
      "view_more_link_label" varchar,
      "view_more_link_appearance" "enum_pages_blocks_blog_section_view_more_link_appearance" DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // pages_blocks_full_width_banner_links
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_full_width_banner_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_full_width_banner_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum_pages_blocks_full_width_banner_links_link_appearance" DEFAULT 'default'
    );
  `)

  // pages_blocks_full_width_banner
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_full_width_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "logo_id" integer,
      "heading" varchar,
      "block_name" varchar
    );
  `)

  // pages_blocks_about_section
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_about_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "breadcrumb" varchar,
      "heading" varchar,
      "content" jsonb,
      "block_name" varchar
    );
  `)

  // pages_blocks_about_us_features
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_about_us_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar
    );
  `)

  // pages_blocks_about_us_card_points
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_about_us_card_points" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point" varchar
    );
  `)

  // pages_blocks_about_us
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_about_us" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "label" varchar,
      "heading" varchar,
      "content" jsonb,
      "card_title" varchar,
      "cta_link_type" "enum_pages_blocks_about_us_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum_pages_blocks_about_us_cta_link_appearance" DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // pages_blocks_vision_mission_values
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_vision_mission_values" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "description" varchar
    );
  `)

  // pages_blocks_vision_mission
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_vision_mission" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "vision_title" varchar,
      "vision_description" varchar,
      "mission_title" varchar,
      "mission_description" varchar,
      "block_name" varchar
    );
  `)

  // pages_blocks_procurement_solutions
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_procurement_solutions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "description" varchar,
      "media_id" integer,
      "cta_link_type" "enum_pages_blocks_procurement_solutions_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum_pages_blocks_procurement_solutions_cta_link_appearance" DEFAULT 'default',
      "block_name" varchar
    );
  `)

  // pages_blocks_services_section_services
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_section_services" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "link_type" "enum_pages_blocks_services_section_services_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar
    );
  `)

  // pages_blocks_services_section
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_services_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
  `)

  // svc_features (service detail section services features)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "svc_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );
  `)

  // svc (service detail section services)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "svc" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "layout" "enum_svc_layout" DEFAULT 'imageLeft',
      "badge" varchar,
      "title" varchar,
      "section_id" varchar,
      "description" jsonb,
      "media_id" integer,
      "cta_link_type" "enum_svc_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum_svc_cta_link_appearance" DEFAULT 'default'
    );
  `)

  // pages_blocks_service_detail_section
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_service_detail_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );
  `)

  // pages_blocks_how_we_work_steps
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_how_we_work_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar
    );
  `)

  // pages_blocks_how_we_work
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_how_we_work" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "badge" varchar,
      "heading" varchar,
      "description" varchar,
      "block_name" varchar
    );
  `)

  // pages_blocks_interest_form
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_interest_form" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "heading" varchar,
      "description" varchar,
      "background_image_id" integer,
      "overlay_heading" varchar,
      "overlay_description" varchar,
      "contact_phone" varchar,
      "contact_email" varchar,
      "form_heading" varchar,
      "form_id" integer,
      "block_name" varchar
    );
  `)

  // ─── Step 6: _pages_v versions of new block tables ───────────────────────

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_blog_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar,
      "title" varchar,
      "limit" numeric DEFAULT 3,
      "view_more_link_type" "enum__pages_v_blocks_blog_section_view_more_link_type" DEFAULT 'reference',
      "view_more_link_new_tab" boolean,
      "view_more_link_url" varchar,
      "view_more_link_label" varchar,
      "view_more_link_appearance" "enum__pages_v_blocks_blog_section_view_more_link_appearance" DEFAULT 'default',
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_full_width_banner_links" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_full_width_banner_links_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum__pages_v_blocks_full_width_banner_links_link_appearance" DEFAULT 'default'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_full_width_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "media_id" integer,
      "logo_id" integer,
      "heading" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "breadcrumb" varchar,
      "heading" varchar,
      "content" jsonb,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_us_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_us_card_points" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_us" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "label" varchar,
      "heading" varchar,
      "content" jsonb,
      "card_title" varchar,
      "cta_link_type" "enum__pages_v_blocks_about_us_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum__pages_v_blocks_about_us_cta_link_appearance" DEFAULT 'default',
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_vision_mission_values" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "description" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_vision_mission" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "vision_title" varchar,
      "vision_description" varchar,
      "mission_title" varchar,
      "mission_description" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_procurement_solutions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "subtitle" varchar,
      "description" varchar,
      "media_id" integer,
      "cta_link_type" "enum__pages_v_blocks_procurement_solutions_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum__pages_v_blocks_procurement_solutions_cta_link_appearance" DEFAULT 'default',
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_section_services" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "link_type" "enum__pages_v_blocks_services_section_services_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_svc_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_svc" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "layout" "enum__pages_v_svc_layout" DEFAULT 'imageLeft',
      "badge" varchar,
      "title" varchar,
      "section_id" varchar,
      "description" jsonb,
      "media_id" integer,
      "cta_link_type" "enum__pages_v_svc_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum__pages_v_svc_cta_link_appearance" DEFAULT 'default'
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_service_detail_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_how_we_work_steps" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "description" varchar
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_how_we_work" (
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
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_interest_form" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "heading" varchar,
      "description" varchar,
      "background_image_id" integer,
      "overlay_heading" varchar,
      "overlay_description" varchar,
      "contact_phone" varchar,
      "contact_email" varchar,
      "form_heading" varchar,
      "form_id" integer,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // ─── Step 7: FK constraints for new hero columns ─────────────────────────
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_logo_id_media_id_fk"
        FOREIGN KEY ("hero_logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_logo_id_media_id_fk"
        FOREIGN KEY ("version_hero_logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // FK for new block tables → pages
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_blog_section" ADD CONSTRAINT "pages_blocks_blog_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_full_width_banner" ADD CONSTRAINT "pages_blocks_full_width_banner_logo_id_fk"
        FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_full_width_banner_links" ADD CONSTRAINT "pages_blocks_full_width_banner_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_full_width_banner"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_about_section" ADD CONSTRAINT "pages_blocks_about_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_about_us" ADD CONSTRAINT "pages_blocks_about_us_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_about_us" ADD CONSTRAINT "pages_blocks_about_us_image_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_about_us_features" ADD CONSTRAINT "pages_blocks_about_us_features_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_about_us"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_about_us_card_points" ADD CONSTRAINT "pages_blocks_about_us_card_points_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_about_us"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_vision_mission" ADD CONSTRAINT "pages_blocks_vision_mission_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_vision_mission_values" ADD CONSTRAINT "pages_blocks_vision_mission_values_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_vision_mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_procurement_solutions" ADD CONSTRAINT "pages_blocks_procurement_solutions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_procurement_solutions" ADD CONSTRAINT "pages_blocks_procurement_solutions_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_section" ADD CONSTRAINT "pages_blocks_services_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_section_services" ADD CONSTRAINT "pages_blocks_services_section_services_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_services_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_service_detail_section" ADD CONSTRAINT "pages_blocks_service_detail_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "svc" ADD CONSTRAINT "svc_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_service_detail_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "svc" ADD CONSTRAINT "svc_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "svc_features" ADD CONSTRAINT "svc_features_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "svc"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_how_we_work" ADD CONSTRAINT "pages_blocks_how_we_work_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_how_we_work_steps" ADD CONSTRAINT "pages_blocks_how_we_work_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_how_we_work"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_background_image_id_fk"
        FOREIGN KEY ("background_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_interest_form" ADD CONSTRAINT "pages_blocks_interest_form_form_id_fk"
        FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // _pages_v FKs
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_blog_section" ADD CONSTRAINT "_pages_v_blocks_blog_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_full_width_banner" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_full_width_banner_links" ADD CONSTRAINT "_pages_v_blocks_full_width_banner_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_full_width_banner"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_about_section" ADD CONSTRAINT "_pages_v_blocks_about_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_about_us" ADD CONSTRAINT "_pages_v_blocks_about_us_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_about_us_features" ADD CONSTRAINT "_pages_v_blocks_about_us_features_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_about_us"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_about_us_card_points" ADD CONSTRAINT "_pages_v_blocks_about_us_card_points_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_about_us"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_vision_mission" ADD CONSTRAINT "_pages_v_blocks_vision_mission_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_vision_mission_values" ADD CONSTRAINT "_pages_v_blocks_vision_mission_values_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_vision_mission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_procurement_solutions" ADD CONSTRAINT "_pages_v_blocks_procurement_solutions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_services_section" ADD CONSTRAINT "_pages_v_blocks_services_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_services_section_services" ADD CONSTRAINT "_pages_v_blocks_services_section_services_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_services_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_service_detail_section" ADD CONSTRAINT "_pages_v_blocks_service_detail_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_svc" ADD CONSTRAINT "_pages_v_svc_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_service_detail_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_svc_features" ADD CONSTRAINT "_pages_v_svc_features_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_svc"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_how_we_work" ADD CONSTRAINT "_pages_v_blocks_how_we_work_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_how_we_work_steps" ADD CONSTRAINT "_pages_v_blocks_how_we_work_steps_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_how_we_work"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_interest_form" ADD CONSTRAINT "_pages_v_blocks_interest_form_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: drop new columns and tables
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_logo_id";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_heading";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_logo_id";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_heading";
  `)
  // Drop new block tables in reverse dependency order
  const tables = [
    '_pages_v_blocks_interest_form', '_pages_v_blocks_how_we_work_steps', '_pages_v_blocks_how_we_work',
    '_pages_v_svc_features', '_pages_v_svc', '_pages_v_blocks_service_detail_section',
    '_pages_v_blocks_services_section_services', '_pages_v_blocks_services_section',
    '_pages_v_blocks_procurement_solutions', '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_vision_mission', '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_about_us_features', '_pages_v_blocks_about_us', '_pages_v_blocks_about_section',
    '_pages_v_blocks_full_width_banner_links', '_pages_v_blocks_full_width_banner',
    '_pages_v_blocks_blog_section',
    'pages_blocks_interest_form', 'pages_blocks_how_we_work_steps', 'pages_blocks_how_we_work',
    'svc_features', 'svc', 'pages_blocks_service_detail_section',
    'pages_blocks_services_section_services', 'pages_blocks_services_section',
    'pages_blocks_procurement_solutions', 'pages_blocks_vision_mission_values',
    'pages_blocks_vision_mission', 'pages_blocks_about_us_card_points',
    'pages_blocks_about_us_features', 'pages_blocks_about_us', 'pages_blocks_about_section',
    'pages_blocks_full_width_banner_links', 'pages_blocks_full_width_banner',
    'pages_blocks_blog_section',
  ]
  for (const t of tables) {
    await db.execute(sql`DROP TABLE IF EXISTS ${sql.raw(`"${t}"`)} CASCADE;`)
  }
}
