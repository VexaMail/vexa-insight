import type { SelfUpdateCapability } from '@/types/updates'
import { NextResponse } from 'next/server'

export function selfUpdateUnavailableResponse(
  capability: SelfUpdateCapability,
): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: 'SELF_UPDATE_UNAVAILABLE',
        message:
          capability.reasons[0] ?? 'Self-update not supported on this install',
      },
    },
    { status: 409 },
  )
}
