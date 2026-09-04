import { chromium } from '@playwright/test'

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })
const page = await browser.newPage()

const errors = []
page.on('console', (m) => {
  const t = m.type()
  if (t === 'error' || t === 'warning') errors.push(`[${t}] ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))

await page.goto('http://localhost:3000/posts', { waitUntil: 'load', timeout: 60000 })

// Sample button presence over time
for (let i = 0; i < 8; i++) {
  await page.waitForTimeout(1000)
  const count = await page.locator('button', { hasText: 'Load More' }).count()
  const cards = await page.locator('article').count()
  console.log(`t=${i + 1}s  buttons(Load More)=${count}  cards=${cards}`)
}

console.log('\n=== console/page errors ===')
for (const e of errors) console.log(e)
console.log('total errors:', errors.length)

await browser.close()
