import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- 1. Recent Clients Block
   CREATE TABLE IF NOT EXISTS "pages_blocks_recent_clients" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"heading" varchar,
   	"block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_recent_clients_clients" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"logo_id" integer
   );

   -- 2. Blog Section Block
   CREATE TABLE IF NOT EXISTS "pages_blocks_blog_section" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"heading" varchar,
   	"title" varchar,
   	"limit" numeric DEFAULT 2,
   	"view_more_link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"view_more_link_new_tab" boolean,
   	"view_more_link_url" varchar,
   	"view_more_link_label" varchar,
   	"view_more_link_appearance" varchar DEFAULT 'default',
   	"block_name" varchar
   );

   -- 3. Full Width Banner Block
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

   CREATE TABLE IF NOT EXISTS "pages_blocks_full_width_banner_links" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"link_new_tab" boolean,
   	"link_url" varchar,
   	"link_label" varchar,
   	"link_appearance" varchar DEFAULT 'default'
   );

   -- 4. About Section Block
   CREATE TABLE IF NOT EXISTS "pages_blocks_about_section" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"breadcrumb" varchar,
   	"heading" varchar,
   	"content" varchar,
   	"block_name" varchar
   );

   -- 5. About Us Block
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
   	"cta_link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"cta_link_new_tab" boolean,
   	"cta_link_url" varchar,
   	"cta_link_label" varchar,
   	"cta_link_appearance" varchar DEFAULT 'default',
   	"block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_about_us_features" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"feature" varchar
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_about_us_card_points" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"point" varchar
   );

   -- 6. Vision & Mission Block
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

   CREATE TABLE IF NOT EXISTS "pages_blocks_vision_mission_values" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"icon" varchar,
   	"title" varchar,
   	"description" varchar
   );

   -- 7. Procurement Solutions Block
   CREATE TABLE IF NOT EXISTS "pages_blocks_procurement_solutions" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"title" varchar,
   	"subtitle" varchar,
   	"description" varchar,
   	"media_id" integer,
   	"cta_link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"cta_link_new_tab" boolean,
   	"cta_link_url" varchar,
   	"cta_link_label" varchar,
   	"cta_link_appearance" varchar DEFAULT 'default',
   	"block_name" varchar
   );

   -- 8. Services Section Block
   CREATE TABLE IF NOT EXISTS "pages_blocks_services_section" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "pages_blocks_services_section_services" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"title" varchar,
   	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"link_new_tab" boolean,
   	"link_url" varchar
   );

   -- 9. Service Detail Section Block (dbName: svc)
   CREATE TABLE IF NOT EXISTS "pages_blocks_service_detail_section" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"_path" text NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"block_name" varchar
   );

   CREATE TABLE IF NOT EXISTS "svc" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"layout" varchar DEFAULT 'imageLeft',
   	"badge" varchar,
   	"title" varchar,
   	"section_id" varchar,
   	"description" varchar,
   	"media_id" integer,
   	"cta_link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"cta_link_new_tab" boolean,
   	"cta_link_url" varchar,
   	"cta_link_label" varchar,
   	"cta_link_appearance" varchar DEFAULT 'default'
   );

   CREATE TABLE IF NOT EXISTS "svc_features" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"item" varchar
   );

   -- 10. How We Work Block
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

   CREATE TABLE IF NOT EXISTS "pages_blocks_how_we_work_steps" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"title" varchar,
   	"description" varchar
   );

   -- 11. Interest Form Block
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_blocks_interest_form";
   DROP TABLE IF EXISTS "pages_blocks_how_we_work_steps";
   DROP TABLE IF EXISTS "pages_blocks_how_we_work";
   DROP TABLE IF EXISTS "svc_features";
   DROP TABLE IF EXISTS "svc";
   DROP TABLE IF EXISTS "pages_blocks_service_detail_section";
   DROP TABLE IF EXISTS "pages_blocks_services_section_services";
   DROP TABLE IF EXISTS "pages_blocks_services_section";
   DROP TABLE IF EXISTS "pages_blocks_procurement_solutions";
   DROP TABLE IF EXISTS "pages_blocks_vision_mission_values";
   DROP TABLE IF EXISTS "pages_blocks_vision_mission";
   DROP TABLE IF EXISTS "pages_blocks_about_us_card_points";
   DROP TABLE IF EXISTS "pages_blocks_about_us_features";
   DROP TABLE IF EXISTS "pages_blocks_about_us";
   DROP TABLE IF EXISTS "pages_blocks_about_section";
   DROP TABLE IF EXISTS "pages_blocks_full_width_banner_links";
   DROP TABLE IF EXISTS "pages_blocks_full_width_banner";
   DROP TABLE IF EXISTS "pages_blocks_blog_section";
   DROP TABLE IF EXISTS "pages_blocks_recent_clients_clients";
   DROP TABLE IF EXISTS "pages_blocks_recent_clients";
  `)
}
