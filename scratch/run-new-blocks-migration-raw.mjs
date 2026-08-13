import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function runDirect() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const statements = [
    `DO $$ BEGIN CREATE TYPE "public"."enum_svc_display_type" AS ENUM('item', 'feature'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,
    `DO $$ BEGIN CREATE TYPE "public"."enum__svc_v_display_type" AS ENUM('item', 'feature'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;`,

    `ALTER TABLE "svc" ADD COLUMN IF NOT EXISTS "sub_heading" varchar;`,
    `ALTER TABLE "svc" ADD COLUMN IF NOT EXISTS "display_type" "enum_svc_display_type" DEFAULT 'item';`,

    `ALTER TABLE "_svc_v" ADD COLUMN IF NOT EXISTS "sub_heading" varchar;`,
    `ALTER TABLE "_svc_v" ADD COLUMN IF NOT EXISTS "display_type" "enum__svc_v_display_type" DEFAULT 'item';`,

    `CREATE TABLE IF NOT EXISTS "svc_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar
    );`,

    `CREATE TABLE IF NOT EXISTS "_svc_v_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "item" varchar,
      "_uuid" varchar
    );`,

    `ALTER TABLE "svc_features" ADD COLUMN IF NOT EXISTS "title" varchar;`,
    `ALTER TABLE "svc_features" ADD COLUMN IF NOT EXISTS "description" varchar;`,

    `ALTER TABLE "_svc_v_features" ADD COLUMN IF NOT EXISTS "title" varchar;`,
    `ALTER TABLE "_svc_v_features" ADD COLUMN IF NOT EXISTS "description" varchar;`
  ]

  for (const stmt of statements) {
    await client.query(stmt)
  }

  console.log('Successfully executed svc_items and svc updates on Supabase!')
  await client.end()
}

runDirect().catch(err => {
  console.error('Migration Direct Error:', err)
  process.exit(1)
})
