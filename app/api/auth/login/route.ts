import { NextRequest, NextResponse } from 'next/server'
import { hash, compare } from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // In production, use real Prisma
    if (process.env.NODE_ENV === 'production' && process.env.POSTGRES_PRISMA_URL) {
      const { prisma } = await import('@/lib/prisma')
      
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Verify password
      const isValidPassword = await compare(password, user.password)
      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Create session (simplified - in real app, use JWT or sessions)
      const userData = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }

      return NextResponse.json({
        user: userData,
        message: 'Login successful'
      })
    }

    // Local development: mock authentication
    // For demo, accept any password for test@example.com
    if (email === 'test@example.com') {
      const mockUser = {
        id: 'mock-user-id',
        email: 'test@example.com',
        createdAt: new Date().toISOString()
      }

      return NextResponse.json({
        user: mockUser,
        message: 'Login successful (mock)'
      })
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}
