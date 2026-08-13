import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function addFormLogoId() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  await client.query(`ALTER TABLE "pages_blocks_interest_form" ADD COLUMN IF NOT EXISTS "form_logo_id" integer;`)
  await client.query(`ALTER TABLE "_pages_v_blocks_interest_form" ADD COLUMN IF NOT EXISTS "form_logo_id" integer;`)

  console.log('Added form_logo_id column to pages_blocks_interest_form and _pages_v_blocks_interest_form!')
  await client.end()
}

addFormLogoId().catch(err => {
  console.error(err)
  process.exit(1)
})
