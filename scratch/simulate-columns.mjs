import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

function isColumnActive({ accessor, column, columns, activeColumnsIndices }) {
  if (column) return column.active
  else if (columns && Array.isArray(columns) && columns.length > 0)
    return Boolean(columns.find((col) => col.accessor === accessor)?.active)
  else if (activeColumnsIndices.length < 4) return true
  return false
}

async function main() {
  const payload = await getPayload({ config })
  const coll = payload.collections['products']

  const fields = coll.config.fields
  const flat = []
  const walk = (f) => {
    if ('name' in f) flat.push({ name: f.name, type: f.type })
    if ('fields' in f && Array.isArray(f.fields)) f.fields.forEach(walk)
    if (f.type === 'tabs' && 'tabs' in f) f.tabs.forEach((t) => t.fields.forEach(walk))
    if (f.type === 'row' && 'fields' in f) f.fields.forEach(walk)
  }
  fields.forEach(walk)

  const simulate = (defaultColumns, label) => {
    // getInitialColumns: defaultColumns used verbatim when present
    const initialCols = defaultColumns.map((c) => ({ accessor: c, active: true }))
    // buildColumnState
    const active = []
    const sortedFields = flat.slice()
    // effectively consider name matching only; order irrelevant for activeness
    for (const f of sortedFields) {
      const columnPref = initialCols.find((p) => p.accessor === f.name)
      const isActive = isColumnActive({
        accessor: f.name,
        column: columnPref,
        columns: initialCols,
        activeColumnsIndices: active,
      })
      if (isActive) active.push(f.name)
    }
    console.log(`\n[${label}] defaultColumns=${JSON.stringify(defaultColumns)}`)
    console.log('  ACTIVE columns rendered in table:', JSON.stringify(active))
    console.log('  title visible?', active.includes('title'), '| slug visible?', active.includes('slug'))
  }

  // Current (buggy)
  simulate(['prices', 'variants'], 'CURRENT config')

  // Candidate fixes
  simulate(['title', 'priceInINR', 'inventory', '_status'], 'FIX A')
  simulate(['title'], 'FIX B (minimal)')
  simulate(['title', 'priceInINR', 'variants', '_status'], 'FIX C')

  process.exit(0)
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1) })