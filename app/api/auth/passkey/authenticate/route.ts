import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { credentialId } = body

    if (!credentialId) {
      return NextResponse.json(
        { error: 'Credential ID is required' },
        { status: 400 }
      )
    }

    // Find the passkey
    const passkey = await prisma.passkey.findUnique({
      where: { credentialId },
      include: { user: true }
    })

    if (!passkey) {
      return NextResponse.json(
        { error: 'Passkey not found' },
        { status: 404 }
      )
    }

    // Update last used timestamp
    await prisma.passkey.update({
      where: { id: passkey.id },
      data: { lastUsedAt: new Date() }
    })

    // Return user data for login
    return NextResponse.json({
      success: true,
      user: {
        id: passkey.user.id,
        email: passkey.user.email,
        createdAt: passkey.user.createdAt
      },
      message: 'Authentication successful'
    })

  } catch (error) {
    console.error('Passkey authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
