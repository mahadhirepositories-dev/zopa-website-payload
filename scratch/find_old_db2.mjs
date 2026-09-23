import 'dotenv/config'
import pg from 'pg'

const base = new URL(process.env.DATABASE_URL)
const connect = db => {
  const u = new URL(process.env.DATABASE_URL)
  u.pathname = '/' + db
  return new pg.Client({ connectionString: u.toString() })
}

// 0) zopa stats reset check
const zopa = connect(base.pathname.slice(1))
await zopa.connect()
const sr = await zopa.query(`SELECT datname, stats_reset::text FROM pg_stat_database WHERE datname = current_database()`)
console.log('zopa stats_reset:', sr.rows[0]?.stats_reset)
await zopa.end()

const admin = new pg.Client({ connectionString: process.env.DATABASE_URL, database: 'postgres' })
await admin.connect()
const dbs = (await admin.query(`SELECT datname, pg_database_size(datname) sz FROM pg_database WHERE NOT datistemplate ORDER BY pg_database_size(datname) DESC`)).rows
await admin.end()

for (const { datname, sz } of dbs) {
  if (['postgres', 'template0', 'template1'].includes(datname)) continue
  const c = connect(datname)
  try {
    await c.connect()
    const verify = (await c.query(`SELECT current_database() d`)).rows[0].d
    const has = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('pages','posts','users','payload_migrations','payload_locked_documents')`)
    const names = has.rows.map(r => r.table_name)
    let out = `${datname} (${(sz/1048576).toFixed(1)} MB) [connected:${verify}]: `
    if (names.includes('pages')) {
      const cnt = async t => (await c.query(`SELECT count(*)::int n FROM "${t}"`)).rows[0].n
      out += `pages=${await cnt('pages')} posts=${names.includes('posts') ? await cnt('posts') : '-'} users=${names.includes('users') ? await cnt('users') : '-'}`
      const migs = names.includes('payload_migrations')
        ? (await c.query(`SELECT count(*)::int n, COALESCE(min(created_at)::date,'-') f, COALESCE(max(created_at)::date,'-') l FROM payload_migrations`)).rows[0]
        : null
      out += migs ? ` | migs=${migs.n} (${migs.f} → ${migs.l})` : ' | NO payload_migrations (push-era)'
    } else out += `no pages table [${names.join(',') || 'empty schema'}]`
    console.log(out)
    await c.end()
  } catch (e) { console.log(`${datname}: SKIP (${String(e.message).split('\n')[0].slice(0, 60)})`) }
}
