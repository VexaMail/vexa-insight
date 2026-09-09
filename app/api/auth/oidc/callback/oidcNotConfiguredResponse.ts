import { NextResponse } from 'next/server'

export function oidcNotConfiguredResponse(): NextResponse {
  return NextResponse.json(
    { error: { code: 'NOT_FOUND', message: 'OIDC not configured' } },
    { status: 404 },
  )
}
