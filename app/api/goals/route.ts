import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const INITIAL_USER_ID = 'init-user-id'

async function ensureAndGetUser() {
  return await prisma.user.upsert({
    where: { id: INITIAL_USER_ID },
    update: {},
    create: {
      id: INITIAL_USER_ID,
      email: 'init@example.com',
      password: 'initial-dummy-password', // Added required field
    },
  })
}

export async function GET(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(goals)
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const body = await request.json()
    
    const goal = await prisma.goal.create({
      data: {
        ...body,
        userId: user.id,
        progress: parseInt(body.progress) || 0,
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
    const user = await ensureAndGetUser()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    const body = await request.json()
    const updatedGoal = await prisma.goal.update({
      where: { id, userId: user.id },
      data: body
    })

    return NextResponse.json(updatedGoal)
  } catch (error) {
    console.error('Error updating goal:', error)
    return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await prisma.goal.delete({
      where: { id, userId: user.id }
    })
    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    console.error('Error deleting goal:', error)
    return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 })
  }
}
