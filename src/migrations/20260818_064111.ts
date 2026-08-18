import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_outcome_cta_link_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'FaRegSquare', 'FaMedal');
  CREATE TYPE "public"."enum_pages_blocks_contact_info_items_icon" AS ENUM('Phone', 'FaWhatsapp', 'Mail');
  CREATE TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook');
  CREATE TYPE "public"."enum__outcome_cta_link_v_cards_icon" AS ENUM('FaPiggyBank', 'FaPenToSquare', 'FaBoxesStacked', 'FaLightbulb', 'FaGears', 'FaChess', 'FaWandMagicSparkles', 'FaBox', 'FaMoneyBill', 'FaUniversalAccess', 'FaShieldHalved', 'FaClock', 'FaGavel', 'FaBullseye', 'FaChartLine', 'FaLeaf', 'FaClipboard', 'FaRegSquare', 'FaMedal');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_info_items_icon" AS ENUM('Phone', 'FaWhatsapp', 'Mail');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon" AS ENUM('FaBriefcase', 'FaInfo', 'FaLinkedin', 'FaAddressBook');
  CREATE TABLE "pages_blocks_contact_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_info_items_icon",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_us_contact_cards_icon",
  	"label" varchar,
  	"value" varchar,
  	"linkedin_url" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact Us',
  	"subheading" varchar DEFAULT 'Our Experts Always Ready to Work With You',
  	"description" varchar DEFAULT 'Ask about general information. Please send us a message.',
  	"form_id" integer,
  	"form_logo_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_info_items_icon",
  	"label" varchar,
  	"value" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_contact_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_us_contact_cards_icon",
  	"label" varchar,
  	"value" varchar,
  	"linkedin_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Contact Us',
  	"subheading" varchar DEFAULT 'Our Experts Always Ready to Work With You',
  	"description" varchar DEFAULT 'Ask about general information. Please send us a message.',
  	"form_id" integer,
  	"form_logo_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_outcome_cta_link_cards_icon" USING "icon"::"public"."enum_outcome_cta_link_cards_icon";
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__outcome_cta_link_v_cards_icon" USING "icon"::"public"."enum__outcome_cta_link_v_cards_icon";
  ALTER TABLE "pages_blocks_contact_info_items" ADD CONSTRAINT "pages_blocks_contact_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_contact_cards" ADD CONSTRAINT "pages_blocks_contact_us_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info_items" ADD CONSTRAINT "_pages_v_blocks_contact_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_contact_cards" ADD CONSTRAINT "_pages_v_blocks_contact_us_contact_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_form_logo_id_media_id_fk" FOREIGN KEY ("form_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_info_items_order_idx" ON "pages_blocks_contact_info_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_items_parent_id_idx" ON "pages_blocks_contact_info_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_contact_cards_order_idx" ON "pages_blocks_contact_us_contact_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_contact_cards_parent_id_idx" ON "pages_blocks_contact_us_contact_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_order_idx" ON "pages_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_parent_id_idx" ON "pages_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_path_idx" ON "pages_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_form_idx" ON "pages_blocks_contact_us" USING btree ("form_id");
  CREATE INDEX "pages_blocks_contact_us_form_logo_idx" ON "pages_blocks_contact_us" USING btree ("form_logo_id");
  CREATE INDEX "_pages_v_blocks_contact_info_items_order_idx" ON "_pages_v_blocks_contact_info_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_items_parent_id_idx" ON "_pages_v_blocks_contact_info_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_contact_cards_order_idx" ON "_pages_v_blocks_contact_us_contact_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_contact_cards_parent_id_idx" ON "_pages_v_blocks_contact_us_contact_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_order_idx" ON "_pages_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_parent_id_idx" ON "_pages_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_path_idx" ON "_pages_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_form_idx" ON "_pages_v_blocks_contact_us" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_contact_us_form_logo_idx" ON "_pages_v_blocks_contact_us" USING btree ("form_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_info_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_us_contact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_info_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us_contact_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_info_items" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact_us_contact_cards" CASCADE;
  DROP TABLE "pages_blocks_contact_us" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info_items" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_contact_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us" CASCADE;
  ALTER TABLE "outcome_cta_link_cards" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "_outcome_cta_link_v_cards" ALTER COLUMN "icon" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_outcome_cta_link_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_info_items_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_us_contact_cards_icon";
  DROP TYPE "public"."enum__outcome_cta_link_v_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_info_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_us_contact_cards_icon";`)
}
