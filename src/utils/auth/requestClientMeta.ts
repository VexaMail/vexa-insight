import type { RequestClientMeta } from '@/types/auth'

/** The caller's first forwarded address and user agent, for audit rows. */
export function requestClientMeta(reqHeaders: Headers): RequestClientMeta {
  return {
    ip: reqHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    userAgent: reqHeaders.get('user-agent') ?? null,
  }
}
