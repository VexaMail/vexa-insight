import type { NextRequest } from 'next/server'

/** The first forwarded address, else the real-ip header, else "unknown". */
export function requestClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
