import 'dotenv/config'
process.env.NODE_ENV = 'production'
const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default
const payload = await getPayload({ config })
try {
  const res = await payload.findVersions({ collection: 'pages', limit: 5, depth: 0 })
  console.log('OK findVersions, totalDocs:', res.totalDocs)
} catch (e) {
  console.log('FAIL findVersions:')
  console.log(String(e?.message).slice(0, 800))
  if (e?.cause) console.log('CAUSE:', String(e.cause?.message).slice(0, 800))
}
try {
  const res2 = await payload.find({ collection: 'pages', limit: 5, draft: false, depth: 0 })
  console.log('OK find pages, totalDocs:', res2.totalDocs)
} catch (e) {
  console.log('FAIL find pages:', String(e?.message).slice(0, 400))
  if (e?.cause) console.log('CAUSE:', String(e.cause?.message).slice(0, 400))
}
process.exit(0)
