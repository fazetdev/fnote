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
      password: 'initial-dummy-password',
    },
  })
}

export async function GET(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const thoughts = await prisma.thought.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(thoughts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const body = await request.json()
    // Added 'type' and 'date' to the destructuring
    const { content, mood, type, date, tags = [] } = body

    if (!content || !type || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const thought = await prisma.thought.create({
      data: {
        content,
        mood,
        type, // Added to Prisma create
        date, // Added to Prisma create
        tags: Array.isArray(tags) ? tags : [],
        userId: user.id
      }
    })
    return NextResponse.json(thought, { status: 201 })
  } catch (error) {
    console.error('Thought creation failed:', error)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

    await prisma.thought.delete({
      where: { id, userId: user.id }
    })
    return NextResponse.json({ message: 'Deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
