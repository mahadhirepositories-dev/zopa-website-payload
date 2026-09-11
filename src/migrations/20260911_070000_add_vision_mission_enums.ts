import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const vals = ['Bot', 'ShieldCheck', 'Shield', 'PiggyBank', 'HandCoins']
  for (const v of vals) {
    try {
      await db.execute(sql.raw(`ALTER TYPE "enum_pages_blocks_vision_mission_values_icon" ADD VALUE IF NOT EXISTS '${v}';`))
    } catch {}
    try {
      await db.execute(sql.raw(`ALTER TYPE "enum__pages_v_blocks_vision_mission_values_icon" ADD VALUE IF NOT EXISTS '${v}';`))
    } catch {}
  }

  // Ensure pages_blocks_about_us cta_link_appearance matches enum type
  try {
    await db.execute(sql.raw(`
      ALTER TABLE "pages_blocks_about_us" 
        ALTER COLUMN "cta_link_appearance" DROP DEFAULT,
        ALTER COLUMN "cta_link_appearance" TYPE "enum_pages_blocks_about_us_cta_link_appearance" 
          USING "cta_link_appearance"::text::"enum_pages_blocks_about_us_cta_link_appearance",
        ALTER COLUMN "cta_link_appearance" SET DEFAULT 'default';
    `))
  } catch {}
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // No-op
}
