import 'dotenv/config'
import pg from 'pg'

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

const tables = ['pages','_pages_v','pricing_cards_link','outcome_cta_link',
  '_pages_v_pricing_cards_link','_pages_v_outcome_cta_link',
  'pricing_cards_link_cards','outcome_cta_link_cards',
  'pricing_cards_link_cards_features','outcome_cta_link_cards_features']

const cols = await client.query(`
  SELECT c.relname t, a.attname col, format_type(a.atttypid, a.atttypmod) typ
  FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum > 0 AND NOT a.attisdropped
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND c.relname = ANY($1)
  ORDER BY c.relname, a.attnum`, [tables])

const byTable = {}
for (const r of cols.rows) (byTable[r.t] ??= []).push(r.col + ' ' + r.typ)
for (const t of tables) {
  console.log('\n== ' + t + ': ' + (byTable[t] ? byTable[t].join(' | ') : '** MISSING **'))
}

for (const t of ['pricing_cards_link','outcome_cta_link','_pages_v_pricing_cards_link','_pages_v_outcome_cta_link','pricing_cards_link_cards','outcome_cta_link_cards']) {
  if (!byTable[t]) continue
  const cnt = await client.query('SELECT count(*)::int n FROM "' + t + '"')
  let extra = ''
  const pidCol = (byTable[t] || []).find(c => c.startsWith('_parent_id '))
  if (pidCol && /char|text/.test(pidCol)) {
    const bad = await client.query("SELECT count(*)::int n FROM \"" + t + "\" WHERE \"_parent_id\" IS NOT NULL AND \"_parent_id\" !~ '^[0-9]+$'")
    extra = ' | non-numeric _parent_id rows=' + bad.rows[0].n
  }
  console.log('ROWS ' + t + ': ' + cnt.rows[0].n + extra)
}
await client.end()
