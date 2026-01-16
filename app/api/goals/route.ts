import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MOCK_USER_ID = 'mock-user-id'

async function getAuthenticatedUser() {
  return { id: MOCK_USER_ID, email: 'test@example.com' }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
      include: { children: true }
    })

    return NextResponse.json(goals)
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, description, type, targetDate, progress = 0, parentId, periodLabel } = body

    if (!title || !type || !targetDate) {
      return NextResponse.json({ error: 'Title, type, and targetDate are required' }, { status: 400 })
    }

    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

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
  } catch (error) {
    console.error('Error creating goal:', error)
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })

    const body = await request.json()
    const { title, description, type, targetDate, progress, parentId, periodLabel } = body

    const existingGoal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
    if (!existingGoal) return NextResponse.json({ error: 'Goal not found' }, { status: 404 })

    const status = progress === 0 ? 'not-started' : progress === 100 ? 'completed' : 'in-progress'

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        title: title || existingGoal.title,
        description: description || existingGoal.description,
        type: type || existingGoal.type,
        targetDate: targetDate ? new Date(targetDate) : existingGoal.targetDate,
        progress: progress !== undefined ? progress : existingGoal.progress,
        status,
        parentId: parentId !== undefined ? parentId : existingGoal.parentId,
        periodLabel: periodLabel || existingGoal.periodLabel
      }
    })

    return NextResponse.json(goal)
  } catch (error) {
    console.error('Error updating goal:', error)
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 })

    const existingGoal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
    if (!existingGoal) return NextResponse.json({ error: 'Goal not found' }, { status: 404 })

    await prisma.goal.delete({ where: { id } })

    return NextResponse.json({ message: 'Goal deleted successfully' })
  } catch (error) {
    console.error('Error deleting goal:', error)
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
  }
}
