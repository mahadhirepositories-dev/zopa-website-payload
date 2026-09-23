import 'dotenv/config'
import pg from 'pg'

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

// 1) Full DDL-ish info for a known-good table (created by sync migration) vs a drifted one
for (const t of ['_pages_v_blocks_job_detail', '_pages_v_blocks_job_detail_responsibilities', '_pages_v_blocks_blog_section', '_svc_v', 'svc', '_svc']) {
  const cols = await client.query(`
    SELECT a.attname col, format_type(a.atttypid, a.atttypmod) typ,
           a.attidentity ident, pg_get_expr(ad.adbin, ad.adrelid) def
    FROM pg_attribute a
    LEFT JOIN pg_attrdef ad ON ad.adrelid = a.attrelid AND ad.adnum = a.attnum
    JOIN pg_class c ON c.oid = a.attrelid JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname='public' AND c.relname=$1 AND a.attnum > 0 AND NOT a.attisdropped
      AND a.attname IN ('id','_parent_id','media_id')`, [t])
  console.log(t + ': ' + (cols.rows.map(r => `${r.col} ${r.typ}${r.ident ? ' IDENTITY=' + r.ident : ''}${r.def ? ' DEF=' + r.def : ''}`).join(' | ') || '** table missing **'))
}

// 2) Data checks for the two main-table drifts
const check = async (t, c) => {
  const q = await client.query(`SELECT count(*)::int n, count("${c}")::int nonnull FROM "${t}"`)
  const vals = await client.query(`SELECT DISTINCT "${c}"::text v FROM "${t}" WHERE "${c}" IS NOT NULL LIMIT 6`)
  console.log(`DATA ${t}.${c}: rows=${q.rows[0].n} nonnull=${q.rows[0].nonnull} values=[${vals.rows.map(r => r.v).join(' || ').slice(0, 300)}]`)
}
await check('pages_blocks_about_section', 'content')
await check('pages_blocks_vision_mission_values', 'icon')
await check('_pages_v_blocks_vision_mission_values', 'icon')
await check('pages', 'id')
await check('posts', 'id')
await check('products', 'id')

// 3) enum value sets for vision_mission icon
const enums = await client.query(`SELECT t.typname, array_agg(e.enumlabel ORDER BY e.enumsortorder) labels
  FROM pg_type t JOIN pg_enum e ON e.enumtypid = t.oid JOIN pg_namespace n ON n.oid=t.typnamespace
  WHERE n.nspname='public' AND t.typname LIKE '%vision_mission%' GROUP BY t.typname`)
for (const e of enums.rows) console.log('ENUM ' + e.typname + ': ' + e.labels.join(','))
await client.end()
