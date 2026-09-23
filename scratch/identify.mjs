import 'dotenv/config'
import pg from 'pg'

const connect = db => {
  const u = new URL(process.env.DATABASE_URL)
  u.pathname = '/' + db
  return new pg.Client({ connectionString: u.toString(), connectionTimeoutMillis: 5000, statement_timeout: 8000 })
}

const candidates = ['zopa', 'dharma_shiksha_parishad', 'tindog', 'e_commerce', 'ecm_database', 'pay_demo', 'first_mile', 'payload-demo']

for (const db of candidates) {
  const c = connect(db)
  try {
    await c.connect()
    const tabs = (await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`)).rows.map(r => r.table_name)
    // distinctive zopa tables
    const markers = ['svc', 'products', 'carts', 'orders', 'transactions', 'reviews', 'comments', 'emails', 'forms', 'form_submissions', 'payload_locked_documents', 'media_files', 'categories']
    const present = markers.filter(m => tabs.includes(m))
    let out = `\n########## ${db}: ${tabs.length} tables | zopa-markers: [${present.join(',')}]`
    if (tabs.includes('pages')) {
      const pages = (await c.query(`SELECT id, slug, title, updated_at::date u FROM pages ORDER BY updated_at DESC NULLS LAST LIMIT 8`)).rows
      out += '\n  PAGES: ' + (pages.map(p => `#${p.id} "${p.title}" (${p.slug}, ${p.u})`).join(' | ') || '(none)')
      const blocks = tabs.filter(t => t.startsWith('pages_blocks_')).length
      out += `\n  pages_blocks_* tables: ${blocks}`
    }
    if (tabs.includes('posts')) {
      const posts = (await c.query(`SELECT id, slug, title FROM posts LIMIT 6`)).rows
      out += '\n  POSTS: ' + (posts.map(p => `"${p.title}" (${p.slug})`).join(' | ') || '(none)')
    }
    if (tabs.includes('users')) {
      const u2 = (await c.query(`SELECT email FROM users LIMIT 4`)).rows
      out += '\n  USERS: ' + u2.map(r => r.email).join(', ')
    }
    if (tabs.includes('media')) {
      const m = (await c.query(`SELECT count(*)::int n FROM media`)).rows[0].n
      out += `\n  MEDIA rows: ${m}`
    }
    console.log(out)
    await c.end()
  } catch (e) { console.log(`\n########## ${db}: SKIP (${String(e.message).split('\n')[0].slice(0, 50)})`); try { await c.end() } catch {} }
}
