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
      const goal = await prisma.goal.findFirst({
        where: {
          id,
          userId: user.id
        },
        include: {
          children: {
            select: {
              id: true,
              title: true,
              type: true,
              progress: true,
              status: true,
              periodLabel: true,
              targetDate: true
            },
            orderBy: { targetDate: 'asc' }
          },
          parent: {
            select: {
              id: true,
              title: true,
              type: true
            }
          }
        }
      })

      if (!goal) {
        return NextResponse.json(
          { error: 'Goal not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(goal)
    }

    // Local development: mock response
    const mockGoal = {
      id,
      title: 'Sample Goal',
      description: 'This is a sample goal description',
      type: 'yearly',
      targetDate: new Date('2024-12-31').toISOString(),
      progress: 30,
      status: 'in-progress',
      parentId: null,
      periodLabel: '2024',
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [],
      parent: null
    }

    return NextResponse.json(mockGoal)
  } catch (error) {
    console.error('Error fetching goal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch goal' },
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
    const { 
      title, 
      description, 
      type, 
      targetDate, 
      progress,
      parentId,
      periodLabel 
    } = body

    if (!title || !type || !targetDate) {
      return NextResponse.json(
        { error: 'Title, type, and targetDate are required' },
        { status: 400 }
      )
    }

    // Determine status based on progress
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      // Check if goal exists and belongs to user
      const existingGoal = await prisma.goal.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!existingGoal) {
        return NextResponse.json(
          { error: 'Goal not found' },
          { status: 404 }
        )
      }

      const updatedGoal = await prisma.goal.update({
        where: { id },
        data: {
          title,
          description,
          type,
          targetDate: new Date(targetDate),
          progress,
          status,
          parentId,
          periodLabel
        }
      })

      return NextResponse.json(updatedGoal)
    }

    // Local development: mock response
    const mockGoal = {
      id,
      title,
      description,
      type,
      targetDate: new Date(targetDate).toISOString(),
      progress: progress || 0,
      status,
      parentId,
      periodLabel,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockGoal)
  } catch (error) {
    console.error('Error updating goal:', error)
    return NextResponse.json(
      { error: 'Failed to update goal' },
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
      
      // Check if goal exists and belongs to user
      const existingGoal = await prisma.goal.findFirst({
        where: {
          id,
          userId: user.id
        }
      })

      if (!existingGoal) {
        return NextResponse.json(
          { error: 'Goal not found' },
          { status: 404 }
        )
      }

      // Delete goal and all its children (cascade delete in Prisma schema)
      await prisma.goal.delete({
        where: { id }
      })

      return NextResponse.json({ message: 'Goal deleted successfully' })
    }

    // Local development: mock response
    return NextResponse.json({ message: 'Goal deleted successfully' })
  } catch (error) {
    console.error('Error deleting goal:', error)
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 }
    )
  }
}
