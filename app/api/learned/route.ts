import { NextRequest, NextResponse } from 'next/server'

async function getAuthenticatedUser(request: NextRequest) {
  try {
    const userData = request.headers.get('x-user-data')
    if (userData) return JSON.parse(userData)
    return null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const category = searchParams.get('category')

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const where: any = { userId: user.id }
      if (date) where.date = new Date(date)
      if (category) where.category = category

      const learnedItems = await prisma.learnedItem.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json(learnedItems)
    }

    // Mock data
    const mockLearned = [
      {
        id: '1',
        title: 'Next.js 13 App Router',
        content: 'Learned about new App Router structure and server components',
        category: 'technology',
        tags: ['nextjs', 'react', 'webdev'],
        date: new Date().toISOString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Prisma with PostgreSQL',
        content: 'Setting up Prisma ORM with Neon PostgreSQL database',
        category: 'technology',
        tags: ['prisma', 'database', 'postgresql'],
        date: new Date().toISOString(),
        userId: user.id,
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json(mockLearned)
  } catch (error) {
    console.error('Error fetching learned items:', error)
    return NextResponse.json({ error: 'Failed to fetch learned items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { title, content, category = 'general', tags = [], date } = body

    if (!title || !content)
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const learnedItem = await prisma.learnedItem.create({
        data: {
          title,
          content,
          category,
          tags,
          date: date ? new Date(date) : new Date(),
          userId: user.id
        }
      })
      return NextResponse.json(learnedItem, { status: 201 })
    }

    const mockLearned = {
      id: Date.now().toString(),
      title,
      content,
      category,
      tags,
      date: date || new Date().toISOString(),
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(mockLearned, { status: 201 })
  } catch (error) {
    console.error('Error creating learned item:', error)
    return NextResponse.json({ error: 'Failed to create learned item' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Learned item ID is required' }, { status: 400 })

    const body = await request.json()
    const { title, content, category, tags, date } = body

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const existingItem = await prisma.learnedItem.findFirst({ where: { id, userId: user.id } })
      if (!existingItem) return NextResponse.json({ error: 'Learned item not found' }, { status: 404 })

      const learnedItem = await prisma.learnedItem.update({
        where: { id },
        data: {
          title: title || existingItem.title,
          content: content || existingItem.content,
          category: category || existingItem.category,
          tags: tags || existingItem.tags,
          date: date ? new Date(date) : existingItem.date
        }
      })
      return NextResponse.json(learnedItem)
    }

    const mockLearned = {
      id,
      title: title || 'Updated title',
      content: content || 'Updated content...',
      category: category || 'general',
      tags: tags || [],
      date: date || new Date().toISOString(),
      userId: user.id,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(mockLearned)
  } catch (error) {
    console.error('Error updating learned item:', error)
    return NextResponse.json({ error: 'Failed to update learned item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Learned item ID is required' }, { status: 400 })

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      const existingItem = await prisma.learnedItem.findFirst({ where: { id, userId: user.id } })
      if (!existingItem) return NextResponse.json({ error: 'Learned item not found' }, { status: 404 })

      await prisma.learnedItem.delete({ where: { id } })
      return NextResponse.json({ message: 'Learned item deleted successfully' })
    }

    return NextResponse.json({ message: 'Learned item deleted successfully' })
  } catch (error) {
    console.error('Error deleting learned item:', error)
    return NextResponse.json({ error: 'Failed to delete learned item' }, { status: 500 })
  }
}
