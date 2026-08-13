import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function catchQueryDirectly() {
  const payload = await getPayload({ config })

  try {
    const res = await payload.findVersions({
      collection: 'pages',
      depth: 0,
      limit: 10,
    })
    console.log('🎉 findVersions SUCCESS! Total docs:', res.totalDocs)
  } catch (err) {
    console.error('❌ findVersions FAIL:', err.message)
    if (err.cause) {
      console.error('Cause:', err.cause.message, 'Position:', err.cause.position)
    }
  }

  process.exit(0)
}

catchQueryDirectly().catch(console.error)
