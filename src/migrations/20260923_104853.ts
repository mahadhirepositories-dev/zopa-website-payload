import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "products_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "_products_v_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_products_id_idx" ON "pages_rels" USING btree ("products_id");
  CREATE INDEX "_pages_v_rels_products_id_idx" ON "_pages_v_rels" USING btree ("products_id");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "header_rels_products_id_idx" ON "header_rels" USING btree ("products_id");
  CREATE INDEX "footer_rels_products_id_idx" ON "footer_rels" USING btree ("products_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_products_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_products_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_products_fk";
  
  ALTER TABLE "_products_v_rels" DROP CONSTRAINT "_products_v_rels_products_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_products_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_products_fk";
  
  DROP INDEX "pages_rels_products_id_idx";
  DROP INDEX "_pages_v_rels_products_id_idx";
  DROP INDEX "products_rels_products_id_idx";
  DROP INDEX "_products_v_rels_products_id_idx";
  DROP INDEX "header_rels_products_id_idx";
  DROP INDEX "footer_rels_products_id_idx";
  ALTER TABLE "pages_rels" DROP COLUMN "products_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "products_id";
  ALTER TABLE "products_rels" DROP COLUMN "products_id";
  ALTER TABLE "_products_v_rels" DROP COLUMN "products_id";
  ALTER TABLE "header_rels" DROP COLUMN "products_id";
  ALTER TABLE "footer_rels" DROP COLUMN "products_id";`)
}
