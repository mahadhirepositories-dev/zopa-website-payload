import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'

async function checkPages() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const pagesRes = await client.query('SELECT id, title, slug, _status FROM pages;')
  console.log('Pages in DB:', pagesRes.rows)

  const usersRes = await client.query('SELECT id, email FROM users;')
  console.log('Users in DB:', usersRes.rows)

  await client.end()
}

checkPages()
