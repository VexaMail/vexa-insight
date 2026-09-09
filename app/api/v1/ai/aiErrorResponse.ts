import type { AIServiceError } from '@/services/ai'
import { NextResponse } from 'next/server'
import { AI_ERROR_STATUS_MAP } from './aiErrorStatusMap'

/** Maps an AI service error to its status; anything else is logged as a 500. */
export function aiErrorResponse(err: unknown, logTag: string): NextResponse {
  if (err && typeof err === 'object' && 'code' in err) {
    const aiError = err as AIServiceError
    const status = AI_ERROR_STATUS_MAP[aiError.code] ?? 500
    return NextResponse.json(
      { error: { code: aiError.code, message: aiError.message } },
      { status },
    )
  }
  console.error(`${logTag} Unexpected error:`, err)
  return NextResponse.json(
    {
      error: { code: 'UNKNOWN', message: 'An unexpected error occurred.' },
    },
    { status: 500 },
  )
}
