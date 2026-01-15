import { NextRequest, NextResponse } from 'next/server'

const MOCK_USER_ID = 'mock-user-id'

async function getAuthenticatedUser() {
  return { id: MOCK_USER_ID, email: 'test@example.com' }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const type = searchParams.get('type')

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      const where: any = { userId: user.id }
      if (date) where.date = new Date(date)
      if (type) where.type = type

      const thoughts = await prisma.thought.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(thoughts)
    }

    // Mock data
    const mockThoughts = [
      {
        id: '1',
        content: 'Offline-first apps provide better user experience',
        type: 'insight',
        mood: '🤔',
        tags: ['development', 'ux'],
        date: new Date().toISOString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        content: 'Progress tracking should be visual and intuitive',
        type: 'observation',
        mood: '🎯',
        tags: ['design', 'productivity'],
        date: new Date().toISOString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(mockThoughts)
  } catch (error) {
    console.error('Error fetching thoughts:', error)
    return NextResponse.json({ error: 'Failed to fetch thoughts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { content, type = 'thought', mood = '😊', tags = [] } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const thought = await prisma.thought.create({
        data: {
          content,
          type,
          mood,
          tags,
          date: new Date(),
          userId: user.id
        }
      })
      return NextResponse.json(thought, { status: 201 })
    }

    // Mock response
    const mockThought = {
      id: Date.now().toString(),
      content,
      type,
      mood,
      tags,
      date: new Date().toISOString(),
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(mockThought, { status: 201 })
  } catch (error) {
    console.error('Error creating thought:', error)
    return NextResponse.json({ error: 'Failed to create thought' }, { status: 500 })
  }
}
