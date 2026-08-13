import { NextRequest, NextResponse } from 'next/server'
import pg from 'pg'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const resolvedParams = await params
  let filename = decodeURIComponent(resolvedParams.filename || '')
  if (filename.includes('?')) {
    filename = filename.split('?')[0]
  }
  if (filename.includes('#')) {
    filename = filename.split('#')[0]
  }

  if (!filename) {
    return new NextResponse('Filename missing', { status: 400 })
  }

  // 1. Query PostgreSQL database media_files table
  const dbUri = process.env.DATABASE_URI
  if (dbUri) {
    try {
      const client = new pg.Client({
        connectionString: dbUri,
        ssl: { rejectUnauthorized: false },
      })
      await client.connect()

      const baseCandidate1 = filename.replace(/-\d+x\d+(\.[a-zA-Z0-9]+)$/, '$1')
      const baseCandidate2 = baseCandidate1.replace(/-\d+(\.[a-zA-Z0-9]+)$/, '$1')

      const res = await client.query(
        'SELECT "mime_type", "data" FROM "media_files" WHERE "filename" = $1 OR "filename" = $2 OR "filename" = $3 LIMIT 1;',
        [filename, baseCandidate1, baseCandidate2]
      )
      await client.end()

      if (res.rows.length > 0) {
        const row = res.rows[0]
        return new NextResponse(row.data, {
          headers: {
            'Content-Type': row.mime_type || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      }
    } catch (err) {
      console.error('Error fetching media from DB:', err)
    }
  }

  // 2. Fallback to local disk file if present
  try {
    const localPath = path.resolve(process.cwd(), 'public/media', filename)
    if (fs.existsSync(localPath)) {
      const fileBuffer = fs.readFileSync(localPath)
      const ext = path.extname(filename).toLowerCase()
      const mimeTypes: Record<string, string> = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.gif': 'image/gif',
      }
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': mimeTypes[ext] || 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
  } catch (err) {
    console.error('Error reading local file:', err)
  }

  return new NextResponse('Media file not found', { status: 404 })
}
