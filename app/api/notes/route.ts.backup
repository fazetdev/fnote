import { NextRequest, NextResponse } from 'next/server'

// Mock user ID for development
const MOCK_USER_ID = 'mock-user-id'

async function getAuthenticatedUser() {
  // TODO: Implement real authentication
  return { id: MOCK_USER_ID, email: 'test@example.com' }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const notes = await prisma.note.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(notes)
    }

    // Local development: mock data
    const mockNotes = [
      {
        id: '1',
        title: 'Project Ideas 2024',
        content: 'Build a note-taking app with offline support...',
        category: 'ideas',
        tags: ['planning', 'development'],
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2', 
        title: 'Learning Goals',
        content: 'Focus on TypeScript and Next.js this quarter...',
        category: 'growth',
        tags: ['learning', 'goals'],
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(mockNotes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

    // Local development: mock response
    const mockNote = {
      id: Date.now().toString(),
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockNote, { status: 201 })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}
