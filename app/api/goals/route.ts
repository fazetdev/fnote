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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const parentId = searchParams.get('parentId')

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      const where: any = { userId: user.id }
      if (type) where.type = type
      if (parentId) where.parentId = parentId
      if (!parentId) where.parentId = null // Default to top-level goals

      const goals = await prisma.goal.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          children: {
            select: {
              id: true,
              title: true,
              type: true,
              progress: true,
              status: true,
              periodLabel: true
            }
          }
        }
      })
      return NextResponse.json(goals)
    }

    // Local development: mock data
    const mockGoals = [
      {
        id: '1',
        title: 'Master Full Stack Development',
        description: 'Become proficient in modern web development',
        type: 'yearly',
        targetDate: new Date('2024-12-31').toISOString(),
        progress: 30,
        status: 'in-progress',
        parentId: null,
        periodLabel: '2024',
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: '2',
            title: 'Learn Next.js 13',
            type: 'quarterly',
            progress: 70,
            status: 'in-progress',
            periodLabel: 'Q1'
          }
        ]
      },
      {
        id: '2',
        title: 'Learn Next.js 13',
        description: 'Master Next.js App Router and new features',
        type: 'quarterly',
        targetDate: new Date('2024-03-31').toISOString(),
        progress: 70,
        status: 'in-progress',
        parentId: '1',
        periodLabel: 'Q1',
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: []
      }
    ]

    // Filter based on query parameters
    let filteredGoals = mockGoals
    if (type) {
      filteredGoals = filteredGoals.filter(goal => goal.type === type)
    }
    if (parentId) {
      filteredGoals = filteredGoals.filter(goal => goal.parentId === parentId)
    } else if (parentId === null) {
      filteredGoals = filteredGoals.filter(goal => goal.parentId === null)
    }

    return NextResponse.json(filteredGoals)
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
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
    const { 
      title, 
      description, 
      type, 
      targetDate, 
      progress = 0,
      parentId,
      periodLabel 
    } = body

    if (!title || !type || !targetDate) {
      return NextResponse.json(
        { error: 'Title, type, and targetDate are required' },
        { status: 400 }
      )
    }

    // Validate goal type
    const validTypes = ['yearly', 'quarterly', 'monthly', 'weekly']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid goal type' },
        { status: 400 }
      )
    }

    // Determine status based on progress
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const goal = await prisma.goal.create({
        data: {
          title,
          description,
          type,
          targetDate: new Date(targetDate),
          progress,
          status,
          parentId,
          periodLabel,
          userId: user.id
        }
      })
      return NextResponse.json(goal, { status: 201 })
    }

    // Local development: mock response
    const mockGoal = {
      id: Date.now().toString(),
      title,
      description,
      type,
      targetDate: new Date(targetDate).toISOString(),
      progress,
      status,
      parentId,
      periodLabel,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: []
    }

    return NextResponse.json(mockGoal, { status: 201 })
  } catch (error) {
    console.error('Error creating goal:', error)
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    )
  }
}
