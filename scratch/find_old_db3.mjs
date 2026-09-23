import 'dotenv/config'
import pg from 'pg'

const connect = db => {
  const u = new URL(process.env.DATABASE_URL)
  u.pathname = '/' + db
  return new pg.Client({ connectionString: u.toString(), connectionTimeoutMillis: 5000, statement_timeout: 5000 })
}

const admin = connect('postgres')
await admin.connect()
const dbs = (await admin.query(`SELECT datname, pg_database_size(datname) sz FROM pg_database WHERE NOT datistemplate ORDER BY pg_database_size(datname) DESC`)).rows
await admin.end()

for (const { datname, sz } of dbs) {
  if (['postgres', 'template0', 'template1'].includes(datname)) continue
  const c = connect(datname)
  try {
    await c.connect()
    const verify = (await c.query(`SELECT current_database() d`)).rows[0].d
    const has = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('pages','posts','users','payload_migrations')`)
    const names = has.rows.map(r => r.table_name)
    let out = `${datname} (${(sz/1048576).toFixed(1)} MB) [${verify}]: `
    if (names.includes('pages')) {
      const cnt = async t => (await c.query(`SELECT count(*)::int n FROM "${t}"`)).rows[0].n
      out += `pages=${await cnt('pages')} posts=${names.includes('posts') ? await cnt('posts') : '-'} users=${names.includes('users') ? await cnt('users') : '-'}`
      if (names.includes('payload_migrations')) {
        const m = (await c.query(`SELECT count(*)::int n, COALESCE(min(created_at)::date::text,'-') f, COALESCE(max(created_at)::date::text,'-') l FROM payload_migrations`)).rows[0]
        out += ` | migs=${m.n} (${m.f} → ${m.l})`
      } else out += ' | NO payload_migrations (push-era)'
    } else out += `no pages table [${names.join(',') || 'empty schema'}]`
    console.log(out)
    await c.end()
  } catch (e) { console.log(`${datname}: SKIP (${String(e.message).split('\n')[0].slice(0, 50)})`); try { await c.end() } catch {} }
}
