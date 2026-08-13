import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function fixCtaContentFk() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  const stmts = [
    `ALTER TABLE "_pages_v_blocks_cta_links" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_cta_links_parent_id_fk";`,
    `ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_content_columns_parent_id_fk";`,
    `ALTER TABLE "pages_blocks_cta_links" DROP CONSTRAINT IF EXISTS "pages_blocks_cta_links_parent_id_fk";`,
    `ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT IF EXISTS "pages_blocks_content_columns_parent_id_fk";`,

    `ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;`,
    `ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`,

    `ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "id" TYPE varchar USING "id"::varchar;`,
    `ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_parent_id" TYPE varchar USING "_parent_id"::varchar;`
  ]

  for (const stmt of stmts) {
    try {
      await client.query(stmt)
      console.log('Executed:', stmt)
    } catch (e) {
      console.error('Error:', e.message)
    }
  }

  await client.end()
}

fixCtaContentFk().catch(console.error)
