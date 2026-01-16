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
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const { searchParams } = new URL(request.url)
      const type = searchParams.get('type')
      const parentId = searchParams.get('parentId')

      const where: any = { userId: user.id }
      if (type) where.type = type
      if (parentId) where.parentId = parentId
      if (!parentId) where.parentId = null

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

    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, description, type, targetDate, progress = 0, parentId, periodLabel } = body

    if (!title || !type || !targetDate)
      return NextResponse.json({ error: 'Title, type, and targetDate are required' }, { status: 400 })

    const validTypes = ['yearly', 'quarterly', 'monthly', 'weekly']
    if (!validTypes.includes(type))
      return NextResponse.json({ error: 'Invalid goal type' }, { status: 400 })

    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

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

    return NextResponse.json({
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
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating goal:', error)
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })

    const body = await request.json()
    const { title, description, type, targetDate, progress, parentId, periodLabel } = body
    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const existingGoal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
      if (!existingGoal) return NextResponse.json({ error: 'Goal not found' }, { status: 404 })

      const goal = await prisma.goal.update({
        where: { id },
        data: {
          title: title ?? existingGoal.title,
          description: description ?? existingGoal.description,
          type: type ?? existingGoal.type,
          targetDate: targetDate ? new Date(targetDate) : existingGoal.targetDate,
          progress: progress ?? existingGoal.progress,
          status: status ?? existingGoal.status,
          parentId: parentId ?? existingGoal.parentId,
          periodLabel: periodLabel ?? existingGoal.periodLabel
        }
      })

      return NextResponse.json(goal)
    }

    return NextResponse.json({ message: 'Updated (dev)' })
  } catch (error) {
    console.error('Error updating goal:', error)
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const existingGoal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
      if (!existingGoal) return NextResponse.json({ error: 'Goal not found' }, { status: 404 })

      await prisma.goal.delete({ where: { id } })
      return NextResponse.json({ message: 'Goal deleted successfully' })
    }

    return NextResponse.json({ message: 'Deleted (dev)' })
  } catch (error) {
    console.error('Error deleting goal:', error)
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
  }
}
