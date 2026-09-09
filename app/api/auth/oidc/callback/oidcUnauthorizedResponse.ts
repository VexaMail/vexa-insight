import { NextResponse } from 'next/server'

export function oidcUnauthorizedResponse(message: string): NextResponse {
  return NextResponse.json(
    { error: { code: 'UNAUTHORIZED', message } },
    { status: 401 },
  )
}
