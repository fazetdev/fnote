import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Get some basic stats
    const [notesCount, goalsCount, thoughtsCount] = await Promise.all([
      prisma.note.count(),
      prisma.goal.count(),
      prisma.thought.count(),
    ])
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      stats: {
        notes: notesCount,
        goals: goalsCount,
        thoughts: thoughtsCount,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Database health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
