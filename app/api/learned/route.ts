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

export async function GET() {
  try {
    const user = await ensureAndGetUser()
    const items = await prisma.learnedItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await ensureAndGetUser()
    const body = await request.json()
    const { id, title, content, category, tags, date } = body

    // We use findFirst/update/create because date is a DateTime type in schema
    const item = await prisma.learnedItem.upsert({
      where: { id: id || 'temp-id' },
      update: {
        title,
        content,
        category,
        tags,
        date: new Date(date)
      },
      create: {
        id: id?.includes('.') ? undefined : id, // Handle client-side temporary IDs
        title,
        content,
        category,
        tags,
        date: new Date(date),
        userId: user.id
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    await prisma.learnedItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
