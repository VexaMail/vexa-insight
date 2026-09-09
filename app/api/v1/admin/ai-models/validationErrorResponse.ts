import { NextResponse } from 'next/server'

export function validationErrorResponse(message: string): NextResponse {
  return NextResponse.json(
    { error: { code: 'VALIDATION_ERROR', message } },
    { status: 400 },
  )
}
