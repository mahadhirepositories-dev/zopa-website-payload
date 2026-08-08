import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- Header columns
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_id" integer;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "phone" varchar;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "ctalink_type" "enum_header_ctalink_type" DEFAULT 'reference';
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "ctalink_new_tab" boolean;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "ctalink_url" varchar;
   ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "ctalink_label" varchar;

   -- Header dropdown children table
   CREATE TABLE IF NOT EXISTS "header_nav_items_children" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"link_new_tab" boolean,
   	"link_url" varchar,
   	"link_label" varchar
   );

   -- Footer columns
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_heading" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_description" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_button_type" "enum_header_ctalink_type" DEFAULT 'reference';
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_button_new_tab" boolean;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_button_url" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_button_label" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "cta_logo_id" integer;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "contact_address" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "contact_phone" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "contact_email" varchar;
   ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "copyright" varchar;

   -- Footer sub-tables
   CREATE TABLE IF NOT EXISTS "footer_columns" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"title" varchar
   );

   CREATE TABLE IF NOT EXISTS "footer_columns_links" (
   	"_order" integer NOT NULL,
   	"_parent_id" varchar NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
   	"link_new_tab" boolean,
   	"link_url" varchar,
   	"link_label" varchar
   );

   CREATE TABLE IF NOT EXISTS "footer_social_links" (
   	"_order" integer NOT NULL,
   	"_parent_id" integer NOT NULL,
   	"id" varchar PRIMARY KEY NOT NULL,
   	"platform" varchar,
   	"url" varchar
   );

   -- Indexes
   CREATE INDEX IF NOT EXISTS "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
   CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "header_nav_items_children";
   DROP TABLE IF EXISTS "footer_columns_links";
   DROP TABLE IF EXISTS "footer_columns";
   DROP TABLE IF EXISTS "footer_social_links";
  `)
}
