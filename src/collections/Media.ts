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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://junhxesyfpnqapxaulvj.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''

const uploadToSupabase: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (SUPABASE_KEY && req.file && req.file.data && doc.filename) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      await supabase.storage.from('media').upload(doc.filename, req.file.data, {
        contentType: req.file.mimetype,
        upsert: true,
      })
    } catch (err) {
      console.error('Supabase Storage upload error:', err)
    }
  }
  return doc
}

const deleteFromSupabase: CollectionAfterDeleteHook = async ({ doc }) => {
  if (SUPABASE_KEY && doc?.filename) {
    try {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
      await supabase.storage.from('media').remove([doc.filename])
    } catch (err) {
      console.error('Supabase Storage delete error:', err)
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
    afterChange: [uploadToSupabase],
    afterDelete: [deleteFromSupabase],
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
