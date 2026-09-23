import 'dotenv/config'
process.env.NODE_ENV = 'production'
const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default
const payload = await getPayload({ config })

let doc
try {
  doc = await payload.create({
    collection: 'pages',
    draft: true,
    data: {
      title: '__schema_test_page__',
      slug: '__schema-test-page__',
      layout: [
        { blockName: 't', blockType: 'pricingComparison', badge: 'b', heading: 'h', description: 'd',
          cards: [{ name: 'c', tagline: 't', description: 'd', features: [{ feature: 'f' }],
                    ctaLink: { label: 'L', type: 'custom', url: '/x', appearance: 'outline' } }] },
        { blockName: 't2', blockType: 'outcomeSection', badge: 'b', heading: 'h',
          cards: [{ icon: 'FaBox', title: 'T', description: 'D' }] },
        { blockName: 't3', blockType: 'jobDetail', heading: 'J',
          responsibilities: [{ type: 'detailed', heading: 'H', paragraph: 'P', text: 'x' }],
          minimumRequirements: [{ text: 'm' }], desiredRequirements: [{ text: 'd' }] },
      ],
    },
  })
  console.log('CREATE draft OK id=' + doc.id)
  const versions = await payload.findVersions({ collection: 'pages', where: { parent: { equals: doc.id } }, depth: 0 })
  console.log('VERSIONS for test page:', versions.totalDocs)
  const v = versions.docs[0]
  const pc = v?.version?.layout?.find(b => b.blockType === 'pricingComparison')
  const os = v?.version?.layout?.find(b => b.blockType === 'outcomeSection')
  const jd = v?.version?.layout?.find(b => b.blockType === 'jobDetail')
  console.log('pricingComparison cards:', pc?.cards?.length, '| cta appearance:', pc?.cards?.[0]?.ctaLink?.appearance)
  console.log('outcomeSection cards:', os?.cards?.length)
  console.log('jobDetail responsibilities:', JSON.stringify(jd?.responsibilities))
  console.log('jobDetail min/desired:', jd?.minimumRequirements?.length + '/' + jd?.desiredRequirements?.length)
} catch (e) {
  console.log('FAIL:', String(e?.message).slice(0, 600))
  if (e?.cause) console.log('CAUSE:', String(e.cause?.message).slice(0, 600))
} finally {
  if (doc) { await payload.delete({ collection: 'pages', id: doc.id }); console.log('CLEANUP: test page deleted') }
}
process.exit(0)
