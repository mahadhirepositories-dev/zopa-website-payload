import { CollectionConfig, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { createClient } from '@supabase/supabase-js'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

import pg from 'pg'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const saveToDbStorage: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (req.file && req.file.data && doc.filename) {
    try {
      const dbUri = process.env.DATABASE_URI
      if (dbUri) {
        const client = new pg.Client({
          connectionString: dbUri,
          ssl: { rejectUnauthorized: false },
        })
        await client.connect()
        await client.query(
          `INSERT INTO "media_files" ("filename", "mime_type", "data")
           VALUES ($1, $2, $3)
           ON CONFLICT ("filename") DO UPDATE SET "data" = EXCLUDED."data", "mime_type" = EXCLUDED."mime_type";`,
          [doc.filename, req.file.mimetype, req.file.data]
        )
        await client.end()
        console.log(`Saved file binary for ${doc.filename} into DB media_files successfully!`)
      }
    } catch (err) {
      console.error('Save to media_files DB error:', err)
    }
  }
  return doc
}

const deleteFromDbStorage: CollectionAfterDeleteHook = async ({ doc }) => {
  if (doc?.filename) {
    try {
      const dbUri = process.env.DATABASE_URI
      if (dbUri) {
        const client = new pg.Client({
          connectionString: dbUri,
          ssl: { rejectUnauthorized: false },
        })
        await client.connect()
        await client.query(`DELETE FROM "media_files" WHERE "filename" = $1;`, [doc.filename])
        await client.end()
        console.log(`Deleted file binary for ${doc.filename} from DB media_files!`)
      }
    } catch (err) {
      console.error('Delete from media_files DB error:', err)
    }
  }
}

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [saveToDbStorage],
    afterDelete: [deleteFromDbStorage],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
