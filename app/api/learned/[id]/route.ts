import { NextRequest, NextResponse } from 'next/server'

const MOCK_USER_ID = 'mock-user-id'

async function getAuthenticatedUser() {
  return { id: MOCK_USER_ID, email: 'test@example.com' }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params

    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      const existing = await prisma.learnedItem.findFirst({
        where: { id, userId: user.id }
      })
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

      await prisma.learnedItem.delete({ where: { id } })
      return NextResponse.json({ message: 'Deleted successfully' })
    }

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('Error deleting learned item:', error)
    return NextResponse.json({ error: 'Failed to delete learned item' }, { status: 500 })
  }
}
