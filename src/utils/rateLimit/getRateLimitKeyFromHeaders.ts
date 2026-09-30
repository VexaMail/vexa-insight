import { clientIpFromHeaders } from '@/utils/security'

export function getRateLimitKeyFromHeaders(headers: Headers): string {
  return `ip:${clientIpFromHeaders(headers) ?? 'anonymous'}`
}
