import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Fix svc.description column type: jsonb → varchar (textarea field, not richText)
  await db.execute(sql`
    ALTER TABLE "svc"
      ALTER COLUMN "description" TYPE varchar USING description::text;
  `)

  // Fix _pages_v_svc.description column type: jsonb → varchar
  await db.execute(sql`
    ALTER TABLE "_pages_v_svc"
      ALTER COLUMN "description" TYPE varchar USING description::text;
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
