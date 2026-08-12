import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`SELECT pg_advisory_xact_lock(2026080823);`)

  const tables = [
    '_pages_v_blocks_full_width_banner_links',
    '_pages_v_blocks_about_us_features',
    '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_services_section_services',
    '_pages_v_svc_features',
    '_pages_v_blocks_how_we_work_steps',
    '_pages_v_svc',
  ]

  for (const table of tables) {
    await db.execute(sql`
      DO $$ BEGIN
        ALTER TABLE "${sql.raw(table)}" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
      EXCEPTION WHEN others THEN NULL; END $$;
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const tables = [
    '_pages_v_blocks_full_width_banner_links',
    '_pages_v_blocks_about_us_features',
    '_pages_v_blocks_about_us_card_points',
    '_pages_v_blocks_vision_mission_values',
    '_pages_v_blocks_services_section_services',
    '_pages_v_svc_features',
    '_pages_v_blocks_how_we_work_steps',
    '_pages_v_svc',
  ]

  for (const table of tables) {
    await db.execute(sql`
      ALTER TABLE "${sql.raw(table)}" DROP COLUMN IF EXISTS "_uuid";
    `)
  }
}
