import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function testPagesAPI() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })
  console.log('Payload initialized!')

  try {
    const pages = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 10,
    })
    console.log('payload.find pages success! Total docs:', pages.totalDocs)
  } catch (e) {
    console.error('payload.find error:', e)
  }

  try {
    const versions = await payload.findVersions({
      collection: 'pages',
      depth: 0,
      limit: 10,
    })
    console.log('payload.findVersions success! Total docs:', versions.totalDocs)
  } catch (e) {
    console.error('payload.findVersions error:', e)
  }

  process.exit(0)
}

testPagesAPI().catch(console.error)
