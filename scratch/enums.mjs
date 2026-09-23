import 'dotenv/config'
import pg from 'pg'
const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
const enums = await client.query(`SELECT t.typname, array_agg(e.enumlabel ORDER BY e.enumsortorder)::text[] labels
  FROM pg_type t JOIN pg_enum e ON e.enumtypid = t.oid JOIN pg_namespace n ON n.oid=t.typnamespace
  WHERE n.nspname='public' AND (t.typname LIKE '%vision_mission%' OR t.typname LIKE '%pricing_cards_link%' OR t.typname LIKE '%outcome_cta_link%')
  GROUP BY t.typname ORDER BY t.typname`)
for (const e of enums.rows) console.log(e.typname + ': [' + e.labels.join(', ') + ']')
await client.end()
