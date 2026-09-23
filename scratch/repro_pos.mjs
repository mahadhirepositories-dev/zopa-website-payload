import 'dotenv/config'
process.env.NODE_ENV = 'production'
const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default
const payload = await getPayload({ config })
try {
  await payload.find({ collection: 'pages', limit: 1, draft: false, depth: 0 })
  console.log('OK')
} catch (e) {
  const cause = e?.cause ?? e
  console.log('PG MESSAGE:', cause?.message)
  console.log('PG POSITION:', cause?.position, 'LINE:', cause?.line)
  const sql = String(e?.message ?? '')
  // e.message contains the full failed query text after "Failed query: "
  const q = sql.replace(/^Failed query: /, '')
  const pos = parseInt(cause?.position ?? '0', 10)
  if (pos > 0) {
    console.log('\n--- SQL around error position ---')
    console.log(q.slice(Math.max(0, pos - 400), pos + 200))
  } else {
    // search for join fragments comparing _parent_id with pages.id
    const frags = q.split('left join').filter(f => f.includes('= "pages"."id"'))
    console.log('\n--- joins referencing pages.id ---')
    frags.slice(0, 40).forEach(f => console.log('JOIN:', f.slice(0, 220).replace(/\s+/g, ' ')))
  }
}
process.exit(0)
