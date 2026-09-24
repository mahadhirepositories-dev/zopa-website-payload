import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_heading" CASCADE;
  DROP TABLE "pages_blocks_sub_heading" CASCADE;
  DROP TABLE "pages_blocks_points_points" CASCADE;
  DROP TABLE "pages_blocks_points" CASCADE;
  DROP TABLE "pages_blocks_description" CASCADE;
  DROP TABLE "_pages_v_blocks_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_sub_heading" CASCADE;
  DROP TABLE "_pages_v_blocks_points_points" CASCADE;
  DROP TABLE "_pages_v_blocks_points" CASCADE;
  DROP TABLE "_pages_v_blocks_description" CASCADE;
  ALTER TABLE "job_ops" ADD COLUMN "anchor_id" varchar;
  ALTER TABLE "pages_blocks_terms_and_conditions" ADD COLUMN IF NOT EXISTS "content" jsonb;
  ALTER TABLE "_job_ops_v" ADD COLUMN "anchor_id" varchar;
  ALTER TABLE "_pages_v_blocks_terms_and_conditions" ADD COLUMN IF NOT EXISTS "content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sub_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "pages_blocks_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sub_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"point" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_heading" ADD CONSTRAINT "pages_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sub_heading" ADD CONSTRAINT "pages_blocks_sub_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points_points" ADD CONSTRAINT "pages_blocks_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_points" ADD CONSTRAINT "pages_blocks_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_description" ADD CONSTRAINT "pages_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_heading" ADD CONSTRAINT "_pages_v_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sub_heading" ADD CONSTRAINT "_pages_v_blocks_sub_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points_points" ADD CONSTRAINT "_pages_v_blocks_points_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_points" ADD CONSTRAINT "_pages_v_blocks_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_description" ADD CONSTRAINT "_pages_v_blocks_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_heading_order_idx" ON "pages_blocks_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_heading_parent_id_idx" ON "pages_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_heading_path_idx" ON "pages_blocks_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_sub_heading_order_idx" ON "pages_blocks_sub_heading" USING btree ("_order");
  CREATE INDEX "pages_blocks_sub_heading_parent_id_idx" ON "pages_blocks_sub_heading" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sub_heading_path_idx" ON "pages_blocks_sub_heading" USING btree ("_path");
  CREATE INDEX "pages_blocks_points_points_order_idx" ON "pages_blocks_points_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_points_parent_id_idx" ON "pages_blocks_points_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_points_order_idx" ON "pages_blocks_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_points_parent_id_idx" ON "pages_blocks_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_points_path_idx" ON "pages_blocks_points" USING btree ("_path");
  CREATE INDEX "pages_blocks_description_order_idx" ON "pages_blocks_description" USING btree ("_order");
  CREATE INDEX "pages_blocks_description_parent_id_idx" ON "pages_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_description_path_idx" ON "pages_blocks_description" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_heading_order_idx" ON "_pages_v_blocks_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_heading_parent_id_idx" ON "_pages_v_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_heading_path_idx" ON "_pages_v_blocks_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sub_heading_order_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sub_heading_parent_id_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sub_heading_path_idx" ON "_pages_v_blocks_sub_heading" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_points_points_order_idx" ON "_pages_v_blocks_points_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_points_parent_id_idx" ON "_pages_v_blocks_points_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_points_order_idx" ON "_pages_v_blocks_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_points_parent_id_idx" ON "_pages_v_blocks_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_points_path_idx" ON "_pages_v_blocks_points" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_description_order_idx" ON "_pages_v_blocks_description" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_description_parent_id_idx" ON "_pages_v_blocks_description" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_description_path_idx" ON "_pages_v_blocks_description" USING btree ("_path");
  ALTER TABLE "job_ops" DROP COLUMN "anchor_id";
  ALTER TABLE "pages_blocks_terms_and_conditions" DROP COLUMN "content";
  ALTER TABLE "_job_ops_v" DROP COLUMN "anchor_id";
  ALTER TABLE "_pages_v_blocks_terms_and_conditions" DROP COLUMN "content";`)
}
