import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

export function invalidRefResponse(error: ZodError): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: 'INVALID_REF',
        message:
          error.issues[0]?.message ?? 'ref must match vMAJOR.MINOR.PATCH',
      },
    },
    { status: 400 },
  )
}
