import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`SELECT pg_advisory_xact_lock(202608082150);`)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "svc" ALTER COLUMN "description" TYPE varchar USING description::text;
    EXCEPTION WHEN others THEN NULL; END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "_pages_v_svc" ALTER COLUMN "description" TYPE varchar USING description::text;
    EXCEPTION WHEN others THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "svc"
      ALTER COLUMN "description" TYPE jsonb USING description::jsonb;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_svc"
      ALTER COLUMN "description" TYPE jsonb USING description::jsonb;
  `)
}
