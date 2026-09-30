import type { RequestClientMeta } from '@/types/auth'
import { clientIpFromHeaders } from '@/utils/security'

/** The caller's address and user agent, for audit rows. */
export function requestClientMeta(reqHeaders: Headers): RequestClientMeta {
  return {
    ip: clientIpFromHeaders(reqHeaders),
    userAgent: reqHeaders.get('user-agent') ?? null,
  }
}
