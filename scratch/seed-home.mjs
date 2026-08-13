import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function seedHome() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  // Check if home page exists
  const existing = await client.query("SELECT id FROM pages WHERE slug = 'home';")
  if (existing.rows.length > 0) {
    console.log('Home page already exists ID:', existing.rows[0].id)
    await client.end()
    return
  }

  // Insert home page into pages table
  const insertRes = await client.query(`
    INSERT INTO pages (title, slug, _status, updated_at, created_at)
    VALUES ('Home', 'home', 'published', NOW(), NOW())
    RETURNING id;
  `)
  const pageId = insertRes.rows[0].id
  console.log('Created Home page with ID:', pageId)

  // Insert into _pages_v version table
  await client.query(`
    INSERT INTO _pages_v (parent_id, version_title, version_slug, version__status, version_updated_at, version_created_at, created_at, updated_at, latest)
    VALUES ($1, 'Home', 'home', 'published', NOW(), NOW(), NOW(), NOW(), true);
  `, [pageId])
  console.log('Created version record in _pages_v')

  await client.end()
}

seedHome().catch(err => {
  console.error('Seed Home Error:', err)
  process.exit(1)
})
