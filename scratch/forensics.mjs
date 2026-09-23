import 'dotenv/config'
import pg from 'pg'

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

// A. Where are we connected?
const id = await client.query(`SELECT current_database() db, inet_server_addr()::text addr,
  current_setting('data_directory') datadir, version() ver`)
console.log('DB:', id.rows[0].db, '| addr:', id.rows[0].addr, '| datadir:', id.rows[0].datadir)
console.log('ver:', id.rows[0].ver.split(',')[0])

// B. Full census with lifetime write counters (survive restarts)
const stats = await client.query(`SELECT relname, n_tup_ins, n_tup_del, n_live_tup, n_dead_tup,
  last_vacuum, last_autovacuum FROM pg_stat_user_tables
  ORDER BY n_tup_ins DESC LIMIT 30`)
console.log('\nTABLE | ins | del | live | dead | last_autovacuum')
for (const r of stats.rows)
  console.log(`${r.relname} | ${r.n_tup_ins} | ${r.n_tup_del} | ${r.n_live_tup} | ${r.n_dead_tup} | ${r.last_autovacuum ? new Date(r.last_autovacuum).toISOString() : '-'}`)

// C. Migration bookkeeping timestamps
const migs = await client.query(`SELECT name, batch, created_at::text FROM payload_migrations ORDER BY created_at`)
console.log('\nMIGRATIONS (when recorded):')
for (const m of migs.rows) console.log(`${m.created_at}  batch=${m.batch}  ${m.name}`)

// D. Other databases on this server
const dbs = await client.query(`SELECT datname, pg_size_pretty(pg_database_size(datname)) sz FROM pg_database WHERE NOT datistemplate`)
console.log('\nDATABASES on server:', dbs.rows.map(r => `${r.dbname}(${r.sz})`).join(', '))

await client.end()
