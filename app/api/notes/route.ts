import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Hardcoded initial user for immediate saving
const INITIAL_USER_ID = 'init-user-id'

async function getAuthenticatedUser() {
  return { id: INITIAL_USER_ID, email: 'init@example.com' }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = { userId: user.id }
    if (category) where.category = category

    const notes = await prisma.note.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, content, category = 'general', tags = [] } = body

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        category,
        tags,
        userId: user.id
      }
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Note ID required' }, { status: 400 })

    const body = await request.json()
    const { title, content, category, tags } = body

    const existingNote = await prisma.note.findFirst({
      where: { id, userId: user.id }
    })

    if (!existingNote) return NextResponse.json({ error: 'Note not found' }, { status: 404 })

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title: title || existingNote.title,
        content: content || existingNote.content,
        category: category || existingNote.category,
        tags: tags || existingNote.tags
      }
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Note ID required' }, { status: 400 })

    const existingNote = await prisma.note.findFirst({
      where: { id, userId: user.id }
    })

    if (!existingNote) return NextResponse.json({ error: 'Note not found' }, { status: 404 })

    await prisma.note.delete({ where: { id } })
    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
