import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function findExactFailingTable() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })

  try {
    const versions = await payload.findVersions({
      collection: 'pages',
      depth: 0,
      limit: 10,
    })
    console.log('findVersions SUCCESS!', versions.totalDocs)
  } catch (e) {
    console.error('findVersions Error stack:', e)
  }

  process.exit(0)
}

findExactFailingTable().catch(console.error)
