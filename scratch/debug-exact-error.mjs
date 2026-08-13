import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'
import { readFileSync } from 'fs'

async function debugExactError() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  const logContent = readFileSync('C:/Users/rdine/.gemini/antigravity/brain/a1fc476c-449a-4da5-9cdf-2fa0c645c20a/.system_generated/tasks/task-986.log', 'utf8')
  const queryMatch = logContent.match(/query: `([\s\S]+?)`/)[1]

  try {
    await client.query(queryMatch, [10])
    console.log('Query SUCCESS!')
  } catch (err) {
    console.error('Error Code:', err.code)
    console.error('Error Message:', err.message)
    console.error('Error Position:', err.position)
    if (err.position) {
      const pos = parseInt(err.position)
      console.log('--- EXACT CLAUSE AT ERROR POSITION ---')
      console.log(queryMatch.substring(pos - 100, pos + 100))
    }
  }

  await client.end()
}

debugExactError().catch(console.error)
