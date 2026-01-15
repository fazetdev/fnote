import { NextResponse } from 'next/server'

// For production: Use real Prisma
// For local: Use mock

async function getProductionHealth() {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    // Get some basic stats
    const [notesCount, goalsCount, thoughtsCount] = await Promise.all([
      prisma.note.count(),
      prisma.goal.count(),
      prisma.thought.count(),
    ])

    return {
      status: 'healthy',
      database: 'connected',
      stats: {
        notes: notesCount,
        goals: goalsCount,
        thoughts: thoughtsCount,
      },
      timestamp: new Date().toISOString(),
      environment: 'production'
    }
  } catch (error) {
    console.error('Database health check failed:', error)
    return {
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: 'production'
    }
  }
}

function getLocalHealth() {
  return {
    status: 'healthy',
    database: 'mock',
    stats: {
      notes: 0,
      goals: 0,
      thoughts: 0,
    },
    timestamp: new Date().toISOString(),
    environment: 'development'
  }
}

export async function GET() {
  // Check if we're in production (has DATABASE_URL)
  const isProduction = process.env.DATABASE_URL && process.env.NODE_ENV === 'production'
  
  const healthData = isProduction 
    ? await getProductionHealth()
    : getLocalHealth()
    
  return NextResponse.json(healthData)
}
