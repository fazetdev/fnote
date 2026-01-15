import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { credentialId, userId } = body

    if (!credentialId || !userId) {
      return NextResponse.json(
        { error: 'Credential ID and User ID are required' },
        { status: 400 }
      )
    }

    // Verify the passkey belongs to the user
    const passkey = await prisma.passkey.findFirst({
      where: {
        credentialId,
        userId
      },
      include: { user: true }
    })

    if (!passkey) {
      return NextResponse.json(
        { error: 'Invalid passkey' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      verified: true,
      user: {
        id: passkey.user.id,
        email: passkey.user.email
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
