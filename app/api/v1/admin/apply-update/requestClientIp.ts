import { clientIpFromHeaders } from '@/utils/security'
import type { NextRequest } from 'next/server'

/** The client address your proxies recorded, else "unknown". */
export function requestClientIp(request: NextRequest): string {
  return clientIpFromHeaders(request.headers) ?? 'unknown'
}
