import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json({
    error: 'Fingerprint registration is handled client-side',
    message: 'Use the fingerprint button on the login page'
  }, { status: 200 })
}
