import { NextRequest, NextResponse } from 'next/server'

// Mock user ID for development
const MOCK_USER_ID = 'mock-user-id'

async function getAuthenticatedUser() {
  // TODO: Implement real authentication
  return { id: MOCK_USER_ID, email: 'test@example.com' }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const note = await prisma.note.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!note) {
        return NextResponse.json(
          { error: 'Note not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(note)
    }

    // Local development: mock response
    const mockNote = {
      id,
      title: 'Sample Note',
      content: 'This is a sample note content',
      category: 'general',
      tags: ['sample'],
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockNote)
  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { title, content, category, tags } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      // Check if note exists and belongs to user
      const existingNote = await prisma.note.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!existingNote) {
        return NextResponse.json(
          { error: 'Note not found' },
          { status: 404 }
        )
      }

      const updatedNote = await prisma.note.update({
        where: { id },
        data: {
          title,
          content,
          category: category || existingNote.category,
          tags: tags || existingNote.tags
        }
      })

      return NextResponse.json(updatedNote)
    }

    // Local development: mock response
    const mockNote = {
      id,
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockNote)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      // Check if note exists and belongs to user
      const existingNote = await prisma.note.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!existingNote) {
        return NextResponse.json(
          { error: 'Note not found' },
          { status: 404 }
        )
      }

      await prisma.note.delete({
        where: { id }
      })

      return NextResponse.json({ message: 'Note deleted successfully' })
    }

    // Local development: mock response
    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
