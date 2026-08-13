import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function createMissingEnums() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const enums = [
    `DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_vision_mission_values_icon" AS ENUM('target', 'eye', 'shield', 'award', 'zap', 'star', 'check');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_vision_mission_values_icon" AS ENUM('target', 'eye', 'shield', 'award', 'zap', 'star', 'check');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_product_statcards_icon" AS ENUM('chart', 'users', 'dollar', 'clock', 'check', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_product_statcards_icon" AS ENUM('chart', 'users', 'dollar', 'clock', 'check', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_outcome_cta_link_cards_icon" AS ENUM('chart', 'users', 'dollar', 'clock', 'check', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_outcome_cta_link_cards_icon" AS ENUM('chart', 'users', 'dollar', 'clock', 'check', 'star');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`
  ]

  for (const stmt of enums) {
    try {
      await client.query(stmt)
      console.log('Enum statement executed successfully!')
    } catch (e) {
      console.error('Error executing enum stmt:', e.message)
    }
  }

  await client.end()
}

createMissingEnums().catch(console.error)
