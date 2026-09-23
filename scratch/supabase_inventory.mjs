import { execSync } from 'child_process'
import pg from 'pg'

// Pull the connection string from git history WITHOUT printing it
const file = execSync('git show 608c779:scratch/add-all-version-fields.mjs').toString()
const m = file.match(/connectionString:\s*'([^']+)'/)
if (!m) { console.log('NO conn string found in git object'); process.exit(1) }
const uri = m[1]

const client = new pg.Client({
  connectionString: uri,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000, statement_timeout: 15000,
  options: '-c default_transaction_read_only=on', // hard read-only at PG level
})
try {
  await client.connect()
  const who = await client.query(`SELECT current_database() db, inet_server_addr()::text addr, current_setting('transaction_read_only') ro`)
  console.log('CONNECTED:', who.rows[0].db, '| read_only:', who.rows[0].ro)

  const seqs = await client.query(`SELECT sequencename, last_value FROM pg_sequences WHERE schemaname='public'
    AND sequencename IN ('pages_id_seq','posts_id_seq','media_id_seq','products_id_seq','orders_id_seq',
    'transactions_id_seq','users_id_seq','categories_id_seq','form_submissions_id_seq','emails_id_seq') ORDER BY sequencename`)
  console.log('\nSEQUENCES (rows ever created):')
  for (const s of seqs.rows) console.log(`  ${s.sequencename}: ${s.last_value}`)

  const tables = ['pages','posts','media','products','orders','transactions','form_submissions','users','categories','reviews','comments','emails','carts','media_files']
  console.log('\nROW COUNTS:')
  for (const t of tables) {
    try { const n = await client.query(`SELECT count(*)::int n FROM "${t}"`); console.log(`  ${t}: ${n.rows[0].n}`) }
    catch { console.log(`  ${t}: (no table)`) }
  }

  try {
    const pages = await client.query(`SELECT id, slug, title, updated_at::date u FROM pages ORDER BY updated_at DESC LIMIT 10`)
    console.log('\nPAGES:')
    for (const p of pages.rows) console.log(`  #${p.id} "${p.title}" (${p.slug}, updated ${p.u})`)
  } catch (e) { console.log('pages detail:', String(e.message).split('\n')[0]) }
  try {
    const posts = await client.query(`SELECT id, slug, title FROM posts ORDER BY id LIMIT 10`)
    console.log('POSTS:', posts.rows.map(p => `#${p.id} "${p.title}"`).join(' | ') || '(none)')
  } catch {}
  try {
    const prods = await client.query(`SELECT id, title FROM products ORDER BY id LIMIT 15`)
    console.log('PRODUCTS:', prods.rows.map(p => `#${p.id} ${p.title}`).join(' | '))
  } catch {}
  try {
    const blocks = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE 'pages_blocks_%' ORDER BY table_name`)
    const withRows = []
    for (const { table_name: t } of blocks.rows) {
      const n = (await client.query(`SELECT count(*)::int n FROM "${t}"`)).rows[0].n
      if (n > 0) withRows.push(`${t.replace('pages_blocks_','')}:${n}`)
    }
    console.log('PAGE BLOCKS with data:', withRows.join(', ') || '(none)')
  } catch {}
  try {
    const m2 = await client.query(`SELECT count(*)::int n, COALESCE(sum(octet_length(bin)),0)::bigint bytes FROM media_files`)
    console.log('media_files:', m2.rows[0].n, 'rows,', (m2.rows[0].bytes/1048576).toFixed(1), 'MB binaries')
  } catch {}
} catch (e) {
  console.log('CONNECT FAILED:', String(e.message).split('\n')[0])
} finally {
  try { await client.end() } catch {}
}
