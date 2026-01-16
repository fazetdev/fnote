import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

async function getAuthenticatedUser(request: NextRequest) {
  try {
    const userData = request.headers.get('x-user-data')

    if (!userData) return null

    const parsed = JSON.parse(userData)
    if (!parsed?.id) return null

    return parsed
  } catch {
    return null
  }
}

async function requireUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
      }

      const notes = await prisma.note.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json(notes)
    }

    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, category, tags } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
      }

      const note = await prisma.note.create({
        data: {
          title,
          content,
          category: category || 'general',
          tags: tags || [],
          userId: user.id
        }
      })

      return NextResponse.json(note, { status: 201 })
    }

    return NextResponse.json(
      {
        id: Date.now().toString(),
        title,
        content,
        category: category || 'general',
        tags: tags || [],
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    const body = await request.json()
    const { title, content, category, tags } = body

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
      }

      const existingNote = await prisma.note.findFirst({
        where: { id, userId: user.id }
      })

      if (!existingNote) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 })
      }

      const note = await prisma.note.update({
        where: { id },
        data: {
          title: title ?? existingNote.title,
          content: content ?? existingNote.content,
          category: category ?? existingNote.category,
          tags: tags ?? existingNote.tags
        }
      })

      return NextResponse.json(note)
    }

    return NextResponse.json({ message: 'Updated (dev)' })
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) {
        return NextResponse.json({ error: 'Invalid user' }, { status: 401 })
      }

      const existingNote = await prisma.note.findFirst({
        where: { id, userId: user.id }
      })

      if (!existingNote) {
        return NextResponse.json({ error: 'Note not found' }, { status: 404 })
      }

      await prisma.note.delete({ where: { id } })
      return NextResponse.json({ message: 'Note deleted successfully' })
    }

    return NextResponse.json({ message: 'Deleted (dev)' })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 })
  }
}
