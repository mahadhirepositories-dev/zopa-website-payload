import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_why_register" CASCADE;
  DROP TABLE "products_how_it_works" CASCADE;
  DROP TABLE "products_after_approval" CASCADE;
  DROP TABLE "_products_v_version_why_register" CASCADE;
  DROP TABLE "_products_v_version_how_it_works" CASCADE;
  DROP TABLE "_products_v_version_after_approval" CASCADE;
  ALTER TABLE "products" ADD COLUMN "content" jsonb;
  ALTER TABLE "_products_v" ADD COLUMN "version_content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "products_why_register" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "products_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "products_after_approval" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_products_v_version_why_register" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_after_approval" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "products_why_register" ADD CONSTRAINT "products_why_register_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_how_it_works" ADD CONSTRAINT "products_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_after_approval" ADD CONSTRAINT "products_after_approval_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_why_register" ADD CONSTRAINT "_products_v_version_why_register_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_how_it_works" ADD CONSTRAINT "_products_v_version_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_after_approval" ADD CONSTRAINT "_products_v_version_after_approval_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_why_register_order_idx" ON "products_why_register" USING btree ("_order");
  CREATE INDEX "products_why_register_parent_id_idx" ON "products_why_register" USING btree ("_parent_id");
  CREATE INDEX "products_how_it_works_order_idx" ON "products_how_it_works" USING btree ("_order");
  CREATE INDEX "products_how_it_works_parent_id_idx" ON "products_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "products_after_approval_order_idx" ON "products_after_approval" USING btree ("_order");
  CREATE INDEX "products_after_approval_parent_id_idx" ON "products_after_approval" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_why_register_order_idx" ON "_products_v_version_why_register" USING btree ("_order");
  CREATE INDEX "_products_v_version_why_register_parent_id_idx" ON "_products_v_version_why_register" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_how_it_works_order_idx" ON "_products_v_version_how_it_works" USING btree ("_order");
  CREATE INDEX "_products_v_version_how_it_works_parent_id_idx" ON "_products_v_version_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_after_approval_order_idx" ON "_products_v_version_after_approval" USING btree ("_order");
  CREATE INDEX "_products_v_version_after_approval_parent_id_idx" ON "_products_v_version_after_approval" USING btree ("_parent_id");
  ALTER TABLE "products" DROP COLUMN "content";
  ALTER TABLE "_products_v" DROP COLUMN "version_content";`)
}
