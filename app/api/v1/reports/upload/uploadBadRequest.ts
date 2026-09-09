import { NextResponse } from 'next/server'

export function uploadBadRequest(message: string): NextResponse {
  return NextResponse.json(
    { error: { code: 'BAD_REQUEST', message } },
    { status: 400 },
  )
}
