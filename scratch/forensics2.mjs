import 'dotenv/config'
import pg from 'pg'

const c = new pg.Client({ connectionString: process.env.DATABASE_URL })
await c.connect()

// 1) When were this DB's stats last reset? (counters only count since then)
const sr = await c.query(`SELECT stats_reset::text FROM pg_stat_database WHERE datname = current_database()`)
console.log('zopa stats_reset:', sr.rows[0].stats_reset)

// 2) Sequence forensics: how many rows were EVER created? (deletes never reset sequences)
const seqs = await c.query(`SELECT sequencename, last_value FROM pg_sequences WHERE schemaname='public'
  AND sequencename IN ('pages_id_seq','posts_id_seq','media_id_seq','_pages_v_id_seq','users_id_seq',
  'categories_id_seq','products_id_seq','orders_id_seq','transactions_id_seq','emails_id_seq','reviews_id_seq','comments_id_seq','forms_id_seq','form_submissions_id_seq')
  ORDER BY sequencename`)
console.log('\nSEQUENCES (last_value = rows ever created):')
for (const s of seqs.rows) console.log(`  ${s.sequencename}: ${s.last_value}`)

// 3) Admin-usage evidence: preferences + lock rows have timestamps
const prefs = await c.query(`SELECT key, created_at::text, updated_at::text FROM payload_preferences ORDER BY updated_at DESC LIMIT 10`)
console.log('\nPAYLOAD_PREFERENCES:')
for (const p of prefs.rows) console.log(`  ${p.updated_at}  ${p.key}`)

const lockStats = await c.query(`SELECT n_tup_ins, n_tup_del, n_live_tup FROM pg_stat_user_tables WHERE relname='payload_locked_documents'`)
console.log('\nlocked_documents stats (ins/del/live):', lockStats.rows[0] ? `${lockStats.rows[0].n_tup_ins}/${lockStats.rows[0].n_tup_del}/${lockStats.rows[0].n_live_tup}` : 'no table')

const locks = await c.query(`SELECT count(*)::int n, min(created_at)::text first, max(created_at)::text last FROM payload_locked_documents`)
console.log('locked_documents rows:', locks.rows[0])

// 4) media_files (custom table written by Media hooks)
const mf = await c.query(`SELECT count(*)::int n FROM media_files`).catch(() => ({ rows: [{ n: 'ERR' }] }))
console.log('media_files rows:', mf.rows[0].n)

// 5) other activity tables
for (const t of ['users_sessions','payload_jobs','payload_job_logs']) {
  const st = await c.query(`SELECT n_tup_ins, n_live_tup FROM pg_stat_user_tables WHERE relname=$1`, [t])
  console.log(`${t}:`, st.rows[0] ? `ins=${st.rows[0].n_tup_ins} live=${st.rows[0].n_live_tup}` : 'missing')
}

await c.end()
