import pg from '../node_modules/.pnpm/pg@8.23.0/node_modules/pg/lib/index.js'
async function m() {
  const c = new pg.Client({ connectionString: 'postgres://postgres:root@127.0.0.1:5432/zopa' })
  await c.connect()

  // ---- 1. Full row dump incl relationships Payload list would render ----
  const p = await c.query(`SELECT id,title,slug,"_status",inventory,"price_in_i_n_r","price_in_i_n_r_enabled","deleted_at" FROM products ORDER BY id`)
  console.log('PRODUCTS', p.rows.length)
  for (const r of p.rows) console.log(JSON.stringify(r))

  // which one is NOT deleted (Payload shows these in admin list)
  const vis = p.rows.filter(r=>!r.deleted_at)
  console.log('VISIBLE (non-deleted) count:', vis.length)

  // ---- 2. The versions table latest row per parent (Payload admin list reads latest version) ----
  const v = await c.query(`SELECT id,"_parent_id","version_title","version_slug","version__status","created_at" FROM "_products_v" ORDER BY "_parent_id", id`)
  console.log('VERSIONS', v.rows.length)
  for (const r of v.rows) console.log(JSON.stringify(r))

  // ---- 3. Simulate Payload slug-filtering for list defaultColumns ----
  const cats = await c.query(`SELECT id,"title" FROM categories ORDER BY id`)
  console.log('CATEGORIES', cats.rows.length)
  for (const r of cats.rows) console.log(JSON.stringify(r))

  await c.end()
}
m().catch(console.error)
