import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Acquire advisory lock to prevent race conditions during concurrent Next.js build workers
  await db.execute(sql`SELECT pg_advisory_xact_lock(2026080822);`)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_svc_v" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "layout" "enum_svc_layout" DEFAULT 'imageLeft',
        "badge" varchar,
        "title" varchar,
        "section_id" varchar,
        "description" varchar,
        "media_id" varchar,
        "cta_link_type" "enum_svc_cta_link_type" DEFAULT 'reference',
        "cta_link_new_tab" boolean,
        "cta_link_url" varchar,
        "cta_link_label" varchar,
        "cta_link_appearance" "enum_svc_cta_link_appearance" DEFAULT 'default',
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "_svc_v_features" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "item" varchar,
        "_uuid" varchar
      );
    EXCEPTION WHEN duplicate_table OR duplicate_object THEN NULL; END $$;
  `)

  // Add indexes for performance
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_svc_v_order_idx" ON "_svc_v" ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_svc_v_parent_id_idx" ON "_svc_v" ("_parent_id");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_svc_v_features_order_idx" ON "_svc_v_features" ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "_svc_v_features_parent_id_idx" ON "_svc_v_features" ("_parent_id");
  `)

  // FK: _svc_v._parent_id → _pages_v_blocks_service_detail_section.id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_svc_v"
        ADD CONSTRAINT "_svc_v_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_pages_v_blocks_service_detail_section"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  // FK: _svc_v_features._parent_id → _svc_v.id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_svc_v_features"
        ADD CONSTRAINT "_svc_v_features_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "_svc_v"("id")
        ON DELETE CASCADE ON UPDATE NO ACTION;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "_svc_v_features" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "_svc_v" CASCADE;`)
}
