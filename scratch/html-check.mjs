import { chromium } from '@playwright/test'

const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' })
const page = await browser.newPage()

const resp = await page.goto('http://localhost:3000/posts', { waitUntil: 'domcontentloaded', timeout: 60000 })
console.log('Status:', resp.status())

// Get raw HTML served
const html = await page.content()

// Key structural markers
console.log('Contains "Load More":', html.includes('Load More'))
console.log('Contains "page.client" / PageClient old component:', html.includes('PageClient') || html.includes('totalPosts'))
console.log('Contains old no-op button block (pt-24 pb-24):', html.includes('pt-24 pb-24'))
console.log('Contains sticky wrapper:', html.includes('sticky bottom-0'))
console.log('Contains "Explore expert advice":', html.includes('Explore expert advice'))

// Check for the git hash / version of build — check if there's a dev indicator
console.log('HTML length:', html.length)

// Is this a dev or prod server?
const titleMatch = html.match(/<title>(.*?)<\/title>/)
console.log('Title:', titleMatch ? titleMatch[1] : 'N/A')

await browser.close()
