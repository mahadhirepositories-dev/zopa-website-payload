import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_job_detail_responsibilities_type" AS ENUM('point', 'detailed');
  CREATE TYPE "public"."enum_pages_blocks_job_detail_location_type" AS ENUM('On-site', 'Hybrid', 'Remote');
  CREATE TYPE "public"."enum__pages_v_blocks_job_detail_responsibilities_type" AS ENUM('point', 'detailed');
  CREATE TYPE "public"."enum__pages_v_blocks_job_detail_location_type" AS ENUM('On-site', 'Hybrid', 'Remote');
  CREATE TYPE "public"."enum_forms_blocks_upload_upload_collection" AS ENUM('media');
  CREATE TYPE "public"."enum_footer_terms_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_privacy_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_job_detail_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_job_detail_responsibilities_type" DEFAULT 'point',
  	"text" varchar,
  	"heading" varchar,
  	"paragraph" varchar
  );
  
  CREATE TABLE "pages_blocks_job_detail_minimum_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_job_detail_desired_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_job_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"location_type" "enum_pages_blocks_job_detail_location_type",
  	"about_role" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_job_detail_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_job_detail_responsibilities_type" DEFAULT 'point',
  	"text" varchar,
  	"heading" varchar,
  	"paragraph" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_job_detail_minimum_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_job_detail_desired_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_job_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"city" varchar,
  	"location_type" "enum__pages_v_blocks_job_detail_location_type",
  	"about_role" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_upload_mime_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mime_type" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_upload" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"upload_collection" "enum_forms_blocks_upload_upload_collection" NOT NULL,
  	"width" numeric,
  	"max_file_size" numeric,
  	"required" boolean,
  	"multiple" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "form_submissions_submission_uploads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_product_statcards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "pages_blocks_pricing_cards_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "pages_blocks_blog_section" ADD COLUMN "view_more_link_anchor" varchar;
  ALTER TABLE "pages_blocks_full_width_banner_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pages_blocks_about_us" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "pages_blocks_procurement_solutions" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "pages_blocks_services_section_services" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "svc" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "pages_blocks_interest_form" ADD COLUMN "anchor_id" varchar DEFAULT 'interest';
  ALTER TABLE "pages_blocks_interest_form" ADD COLUMN "contact_phone_label" varchar;
  ALTER TABLE "pages_blocks_interest_form" ADD COLUMN "contact_email_label" varchar;
  ALTER TABLE "pricing_cards_link_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "outcome_cta_link" ADD COLUMN "cta_card_cta_link_anchor" varchar;
  ALTER TABLE "job_ops_jobs" ADD COLUMN "apply_link_anchor" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_product_statcards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_blog_section" ADD COLUMN "view_more_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_full_width_banner_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_about_us" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_procurement_solutions" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_services_section_services" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_svc_v" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD COLUMN "anchor_id" varchar DEFAULT 'interest';
  ALTER TABLE "_pages_v_blocks_interest_form" ADD COLUMN "contact_phone_label" varchar;
  ALTER TABLE "_pages_v_blocks_interest_form" ADD COLUMN "contact_email_label" varchar;
  ALTER TABLE "_pricing_cards_link_v_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_outcome_cta_link_v" ADD COLUMN "cta_card_cta_link_anchor" varchar;
  ALTER TABLE "_job_ops_v_jobs" ADD COLUMN "apply_link_anchor" varchar;
  ALTER TABLE "posts_populated_authors" ADD COLUMN "author_id" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN "author_id" varchar;
  ALTER TABLE "products_blocks_content_columns" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "products_blocks_cta_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "pc_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "_products_v_blocks_content_columns" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_products_v_blocks_cta_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "_pc_v_cards" ADD COLUMN "cta_link_anchor" varchar;
  ALTER TABLE "header_nav_items_children" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "header" ADD COLUMN "ctalink_anchor" varchar;
  ALTER TABLE "footer_columns_links" ADD COLUMN "link_anchor" varchar;
  ALTER TABLE "footer" ADD COLUMN "cta_button_anchor" varchar;
  ALTER TABLE "footer" ADD COLUMN "terms_link_type" "enum_footer_terms_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "terms_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "terms_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "terms_link_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "terms_link_anchor" varchar;
  ALTER TABLE "footer" ADD COLUMN "privacy_link_type" "enum_footer_privacy_link_type" DEFAULT 'reference';
  ALTER TABLE "footer" ADD COLUMN "privacy_link_new_tab" boolean;
  ALTER TABLE "footer" ADD COLUMN "privacy_link_url" varchar;
  ALTER TABLE "footer" ADD COLUMN "privacy_link_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "privacy_link_anchor" varchar;
  ALTER TABLE "pages_blocks_job_detail_responsibilities" ADD CONSTRAINT "pages_blocks_job_detail_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_job_detail_minimum_requirements" ADD CONSTRAINT "pages_blocks_job_detail_minimum_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_job_detail_desired_requirements" ADD CONSTRAINT "pages_blocks_job_detail_desired_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_job_detail" ADD CONSTRAINT "pages_blocks_job_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_job_detail_responsibilities" ADD CONSTRAINT "_pages_v_blocks_job_detail_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_job_detail_minimum_requirements" ADD CONSTRAINT "_pages_v_blocks_job_detail_minimum_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_job_detail_desired_requirements" ADD CONSTRAINT "_pages_v_blocks_job_detail_desired_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_job_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_job_detail" ADD CONSTRAINT "_pages_v_blocks_job_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload_mime_types" ADD CONSTRAINT "forms_blocks_upload_mime_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_upload"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_upload" ADD CONSTRAINT "forms_blocks_upload_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_uploads" ADD CONSTRAINT "form_submissions_submission_uploads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_job_detail_responsibilities_order_idx" ON "pages_blocks_job_detail_responsibilities" USING btree ("_order");
  CREATE INDEX "pages_blocks_job_detail_responsibilities_parent_id_idx" ON "pages_blocks_job_detail_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_detail_minimum_requirements_order_idx" ON "pages_blocks_job_detail_minimum_requirements" USING btree ("_order");
  CREATE INDEX "pages_blocks_job_detail_minimum_requirements_parent_id_idx" ON "pages_blocks_job_detail_minimum_requirements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_detail_desired_requirements_order_idx" ON "pages_blocks_job_detail_desired_requirements" USING btree ("_order");
  CREATE INDEX "pages_blocks_job_detail_desired_requirements_parent_id_idx" ON "pages_blocks_job_detail_desired_requirements" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_detail_order_idx" ON "pages_blocks_job_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_job_detail_parent_id_idx" ON "pages_blocks_job_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_job_detail_path_idx" ON "pages_blocks_job_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_job_detail_responsibilities_order_idx" ON "_pages_v_blocks_job_detail_responsibilities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_job_detail_responsibilities_parent_id_idx" ON "_pages_v_blocks_job_detail_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_detail_minimum_requirements_order_idx" ON "_pages_v_blocks_job_detail_minimum_requirements" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_job_detail_minimum_requirements_parent_id_idx" ON "_pages_v_blocks_job_detail_minimum_requirements" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_detail_desired_requirements_order_idx" ON "_pages_v_blocks_job_detail_desired_requirements" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_job_detail_desired_requirements_parent_id_idx" ON "_pages_v_blocks_job_detail_desired_requirements" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_detail_order_idx" ON "_pages_v_blocks_job_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_job_detail_parent_id_idx" ON "_pages_v_blocks_job_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_job_detail_path_idx" ON "_pages_v_blocks_job_detail" USING btree ("_path");
  CREATE INDEX "forms_blocks_upload_mime_types_order_idx" ON "forms_blocks_upload_mime_types" USING btree ("_order");
  CREATE INDEX "forms_blocks_upload_mime_types_parent_id_idx" ON "forms_blocks_upload_mime_types" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_upload_order_idx" ON "forms_blocks_upload" USING btree ("_order");
  CREATE INDEX "forms_blocks_upload_parent_id_idx" ON "forms_blocks_upload" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_upload_path_idx" ON "forms_blocks_upload" USING btree ("_path");
  CREATE INDEX "form_submissions_submission_uploads_order_idx" ON "form_submissions_submission_uploads" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_uploads_parent_id_idx" ON "form_submissions_submission_uploads" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_media_id_idx" ON "form_submissions_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_job_detail_responsibilities" CASCADE;
  DROP TABLE "pages_blocks_job_detail_minimum_requirements" CASCADE;
  DROP TABLE "pages_blocks_job_detail_desired_requirements" CASCADE;
  DROP TABLE "pages_blocks_job_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_job_detail_responsibilities" CASCADE;
  DROP TABLE "_pages_v_blocks_job_detail_minimum_requirements" CASCADE;
  DROP TABLE "_pages_v_blocks_job_detail_desired_requirements" CASCADE;
  DROP TABLE "_pages_v_blocks_job_detail" CASCADE;
  DROP TABLE "forms_blocks_upload_mime_types" CASCADE;
  DROP TABLE "forms_blocks_upload" CASCADE;
  DROP TABLE "form_submissions_submission_uploads" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  ALTER TABLE "pages_hero_links" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_product_statcards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "pages_blocks_pricing_cards_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "pages_blocks_blog_section" DROP COLUMN "view_more_link_anchor";
  ALTER TABLE "pages_blocks_full_width_banner_links" DROP COLUMN "link_anchor";
  ALTER TABLE "pages_blocks_about_us" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "pages_blocks_procurement_solutions" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "pages_blocks_services_section_services" DROP COLUMN "link_anchor";
  ALTER TABLE "svc" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "pages_blocks_interest_form" DROP COLUMN "anchor_id";
  ALTER TABLE "pages_blocks_interest_form" DROP COLUMN "contact_phone_label";
  ALTER TABLE "pages_blocks_interest_form" DROP COLUMN "contact_email_label";
  ALTER TABLE "pricing_cards_link_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "outcome_cta_link" DROP COLUMN "cta_card_cta_link_anchor";
  ALTER TABLE "job_ops_jobs" DROP COLUMN "apply_link_anchor";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_product_statcards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_pages_v_blocks_pricing_cards_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_pages_v_blocks_blog_section" DROP COLUMN "view_more_link_anchor";
  ALTER TABLE "_pages_v_blocks_full_width_banner_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pages_v_blocks_about_us" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_pages_v_blocks_procurement_solutions" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_pages_v_blocks_services_section_services" DROP COLUMN "link_anchor";
  ALTER TABLE "_svc_v" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_pages_v_blocks_interest_form" DROP COLUMN "anchor_id";
  ALTER TABLE "_pages_v_blocks_interest_form" DROP COLUMN "contact_phone_label";
  ALTER TABLE "_pages_v_blocks_interest_form" DROP COLUMN "contact_email_label";
  ALTER TABLE "_pricing_cards_link_v_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_outcome_cta_link_v" DROP COLUMN "cta_card_cta_link_anchor";
  ALTER TABLE "_job_ops_v_jobs" DROP COLUMN "apply_link_anchor";
  ALTER TABLE "posts_populated_authors" DROP COLUMN "author_id";
  ALTER TABLE "_posts_v_version_populated_authors" DROP COLUMN "author_id";
  ALTER TABLE "products_blocks_content_columns" DROP COLUMN "link_anchor";
  ALTER TABLE "products_blocks_cta_links" DROP COLUMN "link_anchor";
  ALTER TABLE "pc_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "_products_v_blocks_content_columns" DROP COLUMN "link_anchor";
  ALTER TABLE "_products_v_blocks_cta_links" DROP COLUMN "link_anchor";
  ALTER TABLE "_pc_v_cards" DROP COLUMN "cta_link_anchor";
  ALTER TABLE "header_nav_items_children" DROP COLUMN "link_anchor";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_anchor";
  ALTER TABLE "header" DROP COLUMN "ctalink_anchor";
  ALTER TABLE "footer_columns_links" DROP COLUMN "link_anchor";
  ALTER TABLE "footer" DROP COLUMN "cta_button_anchor";
  ALTER TABLE "footer" DROP COLUMN "terms_link_type";
  ALTER TABLE "footer" DROP COLUMN "terms_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN "terms_link_url";
  ALTER TABLE "footer" DROP COLUMN "terms_link_label";
  ALTER TABLE "footer" DROP COLUMN "terms_link_anchor";
  ALTER TABLE "footer" DROP COLUMN "privacy_link_type";
  ALTER TABLE "footer" DROP COLUMN "privacy_link_new_tab";
  ALTER TABLE "footer" DROP COLUMN "privacy_link_url";
  ALTER TABLE "footer" DROP COLUMN "privacy_link_label";
  ALTER TABLE "footer" DROP COLUMN "privacy_link_anchor";
  DROP TYPE "public"."enum_pages_blocks_job_detail_responsibilities_type";
  DROP TYPE "public"."enum_pages_blocks_job_detail_location_type";
  DROP TYPE "public"."enum__pages_v_blocks_job_detail_responsibilities_type";
  DROP TYPE "public"."enum__pages_v_blocks_job_detail_location_type";
  DROP TYPE "public"."enum_forms_blocks_upload_upload_collection";
  DROP TYPE "public"."enum_footer_terms_link_type";
  DROP TYPE "public"."enum_footer_privacy_link_type";`)
}
