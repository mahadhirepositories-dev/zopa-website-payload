import { chromium } from '@playwright/test'

// Truly fresh/incognito-like profile - no persisted state
const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

await page.goto('http://localhost:3000/posts', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(3000)

console.log('=== RENDERED STATE ===')
console.log('Card count:', await page.locator('article').count())
console.log('Load More buttons:', await page.locator('button', { hasText: 'Load More' }).count())

// Get every button on the page with its text
const allButtons = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('button')).map((b) => ({
    text: (b.textContent || '').trim().slice(0, 30),
    display: getComputedStyle(b).display,
    visible: b.offsetParent !== null,
  }))
})
console.log('\nAll <button> elements on page:')
for (const b of allButtons) console.log('  ', JSON.stringify(b))

// Full text search for "Load More" anywhere in DOM
const hasText = await page.evaluate(() => document.body.innerText.includes('Load More'))
console.log('\n"Load More" text present in page body:', hasText)

// Dump the last 500 chars of visible text to see structure at bottom
const bottomText = await page.evaluate(() => {
  const body = document.body
  const text = body.innerText.trim()
  return text.slice(-600)
})
console.log('\n=== BOTTOM 600 CHARS OF PAGE TEXT ===')
console.log(bottomText)

await browser.close()
