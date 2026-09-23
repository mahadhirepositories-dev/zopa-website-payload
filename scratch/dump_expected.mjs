import 'dotenv/config'
import { getPayload } from 'payload'
import { getTableName, getTableColumns } from 'drizzle-orm'
import pg from 'pg'
import config from '../src/payload.config.ts'

const payload = await getPayload({ config, key: 'schema-dump' })

// 1) Payload-expected tables + column types
const expected = {}
for (const t of Object.values(payload.db.tables)) {
  const name = getTableName(t)
  const cols = {}
  for (const c of Object.values(getTableColumns(t))) {
    cols[c.name] = c.getSQLType ? c.getSQLType() : c.dataType
  }
  expected[name] = cols
}

// 2) Actual DB tables + column types
const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()
const res = await client.query(`
  SELECT c.relname t, a.attname col, format_type(a.atttypid, a.atttypmod) typ
  FROM pg_class c JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum > 0 AND NOT a.attisdropped
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname='public' AND c.relkind='r' ORDER BY c.relname, a.attnum`)
const actual = {}
for (const r of res.rows) (actual[r.t] ??= {})[r.col] = r.typ
await client.end()

const expNames = new Set(Object.keys(expected))
const actNames = new Set(Object.keys(actual))
const missing = [...expNames].filter(n => !actNames.has(n))
const extra = [...actNames].filter(n => !expNames.has(n))

console.log('=== MISSING in DB (Payload expects):', missing.length)
console.log(missing.join('\n'))
console.log('\n=== EXTRA in DB (Payload does not know):', extra.length)
console.log(extra.join('\n'))

console.log('\n=== COLUMN TYPE MISMATCHES:')
let mism = 0
for (const n of [...expNames].filter(n => actNames.has(n))) {
  for (const [c, typ] of Object.entries(expected[n])) {
    const a = actual[n][c]
    if (a === undefined) { console.log(`  ${n}.${c} MISSING column (expected ${typ})`); mism++ }
    else {
      // normalize: enum types show as user-defined in both; compare varchar/char/int/text
      const norm = s => s.replace('character varying', 'varchar').replace('timestamp(3) with time zone', 'timestamptz').replace(/\s+/g, ' ').trim()
      const e = norm(typ), aa = norm(a)
      if (e !== aa && !e.startsWith('enum') && !aa.startsWith('enum')) { console.log(`  ${n}.${c}: expected ${e} | actual ${aa}`); mism++ }
      else if (e.startsWith('enum') !== aa.startsWith('enum')) { console.log(`  ${n}.${c}: expected ${e} | actual ${aa} (enum-ness differs)`); mism++ }
    }
  }
}
if (mism === 0) console.log('  (none)')

// 3) detail dump for the two suspect blocks
for (const n of Object.keys(expected).filter(n => /pricing_cards_link|outcome_cta_link/.test(n)).sort()) {
  console.log('\n-- EXPECTED', n)
  console.log('   ' + Object.entries(expected[n]).map(([c, t]) => `${c}:${t}`).join(' | '))
  if (actual[n]) console.log('   ACTUAL   ' + Object.entries(actual[n]).map(([c, t]) => `${c}:${t}`).join(' | '))
}
process.exit(0)
