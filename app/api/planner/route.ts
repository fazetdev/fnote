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
  const user = await prisma.user.findUnique({ where: { id: userId } })
  return user
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const plan = await prisma.dailyPlan.findFirst({
        where: { userId: user.id, date: new Date(date) },
        include: { tasks: { orderBy: { time: 'asc' } } }
      })

      return NextResponse.json(plan || { date, focus: '', tasks: [] })
    }

    return NextResponse.json({ date, focus: '', tasks: [] })
  } catch (error) {
    console.error('Error fetching planner:', error)
    return NextResponse.json({ error: 'Failed to fetch planner' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { date, focus, tasks } = body
    if (!date) return NextResponse.json({ error: 'Date is required' }, { status: 400 })

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const existingPlan = await prisma.dailyPlan.findFirst({
        where: { userId: user.id, date: new Date(date) }
      })

      let plan
      if (existingPlan) {
        plan = await prisma.dailyPlan.update({
          where: { id: existingPlan.id },
          data: {
            focus,
            tasks: { deleteMany: {}, create: tasks || [] }
          },
          include: { tasks: true }
        })
      } else {
        plan = await prisma.dailyPlan.create({
          data: {
            date: new Date(date),
            focus: focus || '',
            userId: user.id,
            tasks: { create: tasks || [] }
          },
          include: { tasks: true }
        })
      }

      return NextResponse.json(plan, { status: 201 })
    }

    return NextResponse.json({
      id: Date.now().toString(),
      date,
      focus: focus || '',
      userId: user.id,
      tasks: tasks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { status: 201 })
  } catch (error) {
    console.error('Error saving planner:', error)
    return NextResponse.json({ error: 'Failed to save planner' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 })

    const body = await request.json()
    const { focus, tasks } = body

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const existingPlan = await prisma.dailyPlan.findFirst({ where: { id, userId: user.id } })
      if (!existingPlan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

      const plan = await prisma.dailyPlan.update({
        where: { id },
        data: {
          focus: focus ?? existingPlan.focus,
          ...(tasks && { tasks: { deleteMany: {}, create: tasks } })
        },
        include: { tasks: true }
      })

      return NextResponse.json(plan)
    }

    return NextResponse.json({ message: 'Updated (dev)' })
  } catch (error) {
    console.error('Error updating planner:', error)
    return NextResponse.json({ error: 'Failed to update planner' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 })

    if (process.env.NODE_ENV === 'production') {
      const dbUser = await requireUser(user.id)
      if (!dbUser) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

      const existingPlan = await prisma.dailyPlan.findFirst({ where: { id, userId: user.id } })
      if (!existingPlan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

      await prisma.dailyPlan.delete({ where: { id } })
      return NextResponse.json({ message: 'Plan deleted successfully' })
    }

    return NextResponse.json({ message: 'Deleted (dev)' })
  } catch (error) {
    console.error('Error deleting planner:', error)
    return NextResponse.json({ error: 'Failed to delete planner' }, { status: 500 })
  }
}
