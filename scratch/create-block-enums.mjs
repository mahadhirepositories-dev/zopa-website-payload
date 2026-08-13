import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function createBlockEnums() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const enums = [
    `DO $$ BEGIN
      CREATE TYPE "public"."enum_pricing_cards_link_cards_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum_pricing_cards_link_cards_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__pricing_cards_link_v_cards_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum_outcome_cta_link_cta_card_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `DO $$ BEGIN
      CREATE TYPE "public"."enum__outcome_cta_link_v_cta_card_cta_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;`
  ]

  for (const stmt of enums) {
    try {
      await client.query(stmt)
      console.log('Executed enum stmt successfully!')
    } catch (e) {
      console.error('Error executing enum stmt:', e.message)
    }
  }

  await client.end()
}

createBlockEnums().catch(console.error)
