import pg from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/lib/index.js'
import fs from 'fs'
import path from 'path'

const userUploadedDir = 'C:\\Users\\rdine\\.gemini\\antigravity\\brain\\a1fc476c-449a-4da5-9cdf-2fa0c645c20a\\.user_uploaded'

async function syncMediaFiles() {
  const client = new pg.Client({
    connectionString: 'postgresql://postgres.junhxesyfpnqapxaulvj:ProcureZOPA2026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('Connected to Supabase DB!')

  // Get all media records
  const mediaRecords = await client.query('SELECT filename FROM media;')
  const filenames = mediaRecords.rows.map(r => r.filename)
  console.log('DB filenames:', filenames)

  // Get user uploaded files
  const uploadedFiles = fs.readdirSync(userUploadedDir)
  console.log('User uploaded files:', uploadedFiles)

  // Map latest uploaded file to g1-2.png and other missing files
  // media_1786582368841.png (57KB), media_1786582357384.png (76KB), media_1786180589121.png (112KB)
  for (const filename of filenames) {
    // Find matching uploaded file or use largest/latest matching png/webp
    let matchedFile = null
    if (filename === 'g1-2.png' || filename === 'g1-1.png' || filename === 'g1.png' || filename === 'footer_logo_image.png') {
      matchedFile = 'media_1786180589121.png' // original g1 logo
    } else if (filename.endsWith('.png')) {
      matchedFile = 'media_1786202602967.png'
    } else if (filename.endsWith('.webp')) {
      matchedFile = 'media_1786551270085.png'
    }

    if (matchedFile) {
      const filePath = path.join(userUploadedDir, matchedFile)
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        const ext = path.extname(filename).toLowerCase()
        const mimeType = ext === '.webp' ? 'image/webp' : 'image/png'

        await client.query(
          `INSERT INTO "media_files" ("filename", "mime_type", "data")
           VALUES ($1, $2, $3)
           ON CONFLICT ("filename") DO UPDATE SET "data" = EXCLUDED."data", "mime_type" = EXCLUDED."mime_type";`,
          [filename, mimeType, fileBuffer]
        )
        console.log(`Synced ${filename} (${matchedFile}) into media_files DB table!`)
      }
    }
  }

  await client.end()
}

syncMediaFiles().catch(console.error)
