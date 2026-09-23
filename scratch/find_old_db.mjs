import 'dotenv/config'
import pg from 'pg'

const admin = new pg.Client({ connectionString: process.env.DATABASE_URL, database: 'postgres' })
await admin.connect()
const dbs = (await admin.query(`SELECT datname, pg_database_size(datname) sz FROM pg_database WHERE NOT datistemplate ORDER BY pg_database_size(datname) DESC`)).rows
await admin.end()

for (const { datname, sz } of dbs) {
  if (['postgres', 'template0', 'template1'].includes(datname)) continue
  const c = new pg.Client({ connectionString: process.env.DATABASE_URL, database: datname })
  try {
    await c.connect()
    const has = await c.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('pages','posts','users','payload_migrations')`)
    const names = has.rows.map(r => r.table_name)
    let out = `${datname} (${(sz/1048576).toFixed(1)} MB): `
    if (names.includes('pages')) {
      const cnt = async t => (await c.query(`SELECT count(*)::int n FROM "${t}"`)).rows[0].n
      out += `pages=${await cnt('pages')} posts=${names.includes('posts') ? await cnt('posts') : '-'} users=${names.includes('users') ? await cnt('users') : '-'}`
      if (names.includes('payload_migrations')) {
        const m = await c.query(`SELECT count(*)::int n, min(created_at)::date first, max(created_at)::date last FROM payload_migrations`)
        out += ` | migs=${m.rows[0].n} (${m.rows[0].first} → ${m.rows[0].last})`
      } else out += ' | no payload_migrations table (push-era DB!)'
    } else out += `no pages table [${names.join(',') || 'empty schema'}]`
    console.log(out)
    await c.end()
  } catch (e) { console.log(`${datname}: SKIP (${String(e.message).split('\n')[0].slice(0, 60)})`) }
}
