import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function createNestedArrayTables() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    // 1. pricing_cards_link_cards table
    `CREATE TABLE IF NOT EXISTS "pricing_cards_link_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "tagline" varchar,
      "description" varchar,
      "cta_link_type" "enum_pages_blocks_pricing_cards_link_cards_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum_pages_blocks_pricing_cards_link_cards_cta_link_appearance" DEFAULT 'default'
    );`,

    // 2. pricing_cards_link_cards_features table
    `CREATE TABLE IF NOT EXISTS "pricing_cards_link_cards_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar NOT NULL
    );`,

    // 3. outcome_cta_link_cards table
    `CREATE TABLE IF NOT EXISTS "outcome_cta_link_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL
    );`,

    // 4. Version shadow tables for nested arrays
    `CREATE TABLE IF NOT EXISTS "_pricing_cards_link_v_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "tagline" varchar,
      "description" varchar,
      "cta_link_type" "enum_pages_blocks_pricing_cards_link_cards_cta_link_type" DEFAULT 'reference',
      "cta_link_new_tab" boolean,
      "cta_link_url" varchar,
      "cta_link_label" varchar,
      "cta_link_appearance" "enum_pages_blocks_pricing_cards_link_cards_cta_link_appearance" DEFAULT 'default',
      "_uuid" varchar
    );`,

    `CREATE TABLE IF NOT EXISTS "_pricing_cards_link_v_cards_features" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar NOT NULL,
      "_uuid" varchar
    );`,

    `CREATE TABLE IF NOT EXISTS "_outcome_cta_link_v_cards" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar NOT NULL,
      "description" varchar NOT NULL,
      "_uuid" varchar
    );`
  ]

  for (const stmt of statements) {
    try {
      await client.query(stmt)
      console.log('Executed statement successfully!')
    } catch (e) {
      console.error('Error executing statement:', e.message)
    }
  }

  await client.end()
}

createNestedArrayTables().catch(console.error)
