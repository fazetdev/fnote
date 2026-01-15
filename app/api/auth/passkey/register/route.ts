import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, credential, publicKey, deviceType, transports } = body

    if (!userId || !credential || !publicKey) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if credential already exists
    const existingCredential = await prisma.passkey.findUnique({
      where: { credentialId: credential.id }
    })

    if (existingCredential) {
      return NextResponse.json(
        { error: 'Credential already registered' },
        { status: 400 }
      )
    }

    // Create new passkey
    const passkey = await prisma.passkey.create({
      data: {
        credentialId: credential.id,
        userId: userId,
        publicKey: publicKey,
        deviceType: deviceType || 'platform',
        transports: transports || ['internal'],
        counter: 0
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Passkey registered successfully',
      passkey: {
        id: passkey.id,
        credentialId: passkey.credentialId,
        deviceType: passkey.deviceType
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Passkey registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register passkey' },
      { status: 500 }
    )
  }
}
