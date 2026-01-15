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
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const plan = await prisma.dailyPlan.findFirst({
        where: {
          userId: user.id,
          date: new Date(date)
        },
        include: {
          tasks: {
            orderBy: { time: 'asc' }
          }
        }
      })
      return NextResponse.json(plan || { date, focus: '', tasks: [] })
    }

    // Mock data
    const mockPlan = {
      date,
      focus: 'Complete the database setup',
      tasks: [
        {
          id: '1',
          text: 'Set up Prisma schema',
          time: '09:00',
          priority: 'high',
          completed: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          text: 'Test database connection',
          time: '10:00',
          priority: 'medium',
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]
    }

    return NextResponse.json(mockPlan)
  } catch (error) {
    console.error('Error fetching planner:', error)
    return NextResponse.json({ error: 'Failed to fetch planner' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { date, focus, tasks } = body

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      // Check if plan exists for this user and date
      const existingPlan = await prisma.dailyPlan.findFirst({
        where: {
          userId: user.id,
          date: new Date(date)
        }
      })

      let plan
      if (existingPlan) {
        // Update existing plan
        plan = await prisma.dailyPlan.update({
          where: { id: existingPlan.id },
          data: {
            focus,
            tasks: {
              deleteMany: {}, // Remove existing tasks
              create: tasks || []
            }
          },
          include: {
            tasks: true
          }
        })
      } else {
        // Create new plan
        plan = await prisma.dailyPlan.create({
          data: {
            date: new Date(date),
            focus: focus || '',
            userId: user.id,
            tasks: {
              create: tasks || []
            }
          },
          include: {
            tasks: true
          }
        })
      }

      return NextResponse.json(plan, { status: 201 })
    }

    // Mock response
    const mockPlan = {
      id: Date.now().toString(),
      date,
      focus: focus || '',
      userId: user.id,
      tasks: tasks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(mockPlan, { status: 201 })
  } catch (error) {
    console.error('Error saving planner:', error)
    return NextResponse.json({ error: 'Failed to save planner' }, { status: 500 })
  }
}
