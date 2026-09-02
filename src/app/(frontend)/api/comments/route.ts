import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { postId, comment, name, email, website } = body

    if (!postId || !comment || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const newComment = await payload.create({
      collection: 'comments',
      data: {
        post: Number(postId),
        comment,
        name,
        email,
        website: website || '',
        status: 'pending',
      },
    })

    return NextResponse.json({ success: true, id: newComment.id })
  } catch (error) {
    console.error('Comment submission failed:', error)
    return NextResponse.json({ error: 'Failed to submit comment' }, { status: 500 })
  }
}