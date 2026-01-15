import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { credentialId, counter } = body

    if (!credentialId) {
      return NextResponse.json(
        { error: 'Credential ID is required' },
        { status: 400 }
      )
    }

    // Find and verify the passkey
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

    // Update counter and last used timestamp
    await prisma.passkey.update({
      where: { id: passkey.id },
      data: {
        counter: counter !== undefined ? counter : passkey.counter + 1,
        lastUsedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      verified: true,
      user: {
        id: passkey.user.id,
        email: passkey.user.email,
        createdAt: passkey.user.createdAt
      }
    })

  } catch (error) {
    console.error('Passkey verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
