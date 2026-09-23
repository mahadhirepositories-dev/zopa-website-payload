import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function main() {
  const payload = await getPayload({ config })
  const coll = payload.collections['products']

  // Reproduce getInitialColumns logic: defaultColumns are used verbatim when present
  const defaultColumns = coll.config.admin?.defaultColumns
  const useAsTitle = coll.config.admin?.useAsTitle
  console.log('defaultColumns:', JSON.stringify(defaultColumns))
  console.log('useAsTitle:', useAsTitle)

  // Which of the defaultColumns actually match a real (flattenable) field accessor?
  const fields = coll.config.fields
  const flat = []
  const walk = (f) => {
    if ('name' in f) flat.push(f.name)
    if ('fields' in f && Array.isArray(f.fields)) f.fields.forEach(walk)
    if (f.type === 'tabs' && 'tabs' in f) f.tabs.forEach((t) => t.fields.forEach(walk))
    if (f.type === 'row' && 'fields' in f) f.fields.forEach(walk)
  }
  fields.forEach(walk)
  const flatSet = new Set(flat)
  console.log('all flattened accessors present:', JSON.stringify([...flatSet]))
  for (const col of defaultColumns) {
    console.log(`column '${col}': ${flatSet.has(col) ? 'MATCHES a field ✓' : '*** NO MATCHING FIELD ✗ ***'}`)
  }
  if (useAsTitle && !defaultColumns.includes(useAsTitle)) {
    console.log(`useAsTitle '${useAsTitle}' is NOT in defaultColumns → title column is INACTIVE ✗`)
  }

  process.exit(0)
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1) })