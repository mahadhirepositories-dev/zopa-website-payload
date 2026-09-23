import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function main() {
  const payload = await getPayload({ config })
  const coll = payload.collections['products']
  console.log('--- products collection resolved config ---')
  console.log('slug:', coll.config.slug)
  console.log('labels:', JSON.stringify(coll.config.labels))
  console.log('useAsTitle:', coll.config.admin?.useAsTitle)
  console.log('defaultColumns:', JSON.stringify(coll.config.admin?.defaultColumns))
  console.log('group:', coll.config.admin?.group)
  console.log('hidden:', coll.config.admin?.hidden)
  console.log('fields count:', coll.config.fields.length)
  for (const f of coll.config.fields) {
    const name = 'name' in f ? f.name : '(anonymous ' + f.type + ')'
    console.log(`  ${name} [${f.type}]`)
  }
  console.log('versions:', JSON.stringify(coll.config.versions))
  console.log('trash:', coll.config.trash)
  console.log('custom:', JSON.stringify(coll.config.custom))

  process.exit(0)
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1) })