import { chromium } from '@playwright/test'

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })

const sizes = [
  { name: 'Mobile 375x667', w: 375, h: 667 },
  { name: 'Mobile 390x844', w: 390, h: 844 },
  { name: 'Tablet 768x1024', w: 768, h: 1024 },
  { name: 'Laptop 1280x800', w: 1280, h: 800 },
  { name: 'Laptop 1366x768', w: 1366, h: 768 },
  { name: 'Desktop 1440x900', w: 1440, h: 900 },
  { name: 'Desktop 1920x1080', w: 1920, h: 1080 },
  { name: 'Wide 2560x1440', w: 2560, h: 1440 },
]

for (const s of sizes) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } })
  await page.goto('http://localhost:3000/posts', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)

  const btn = page.locator('button', { hasText: 'Load More' })
  const count = await btn.count()
  let initial = 'N/A'
  if (count > 0) {
    const b = await btn.first().boundingBox()
    if (b) initial = `y=${Math.round(b.y)} h=${Math.round(b.height)} (visible=${b.y < s.h && b.y + b.height > 0})`
  }
  const cards = await page.locator('article').count()
  console.log(`${s.name}: buttons=${count} cards=${cards} initialButtonBox=${initial}`)
  await page.close()
}

await browser.close()
