export function getRateLimitKeyFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  const ip =
    forwarded?.split(',')[0]?.trim() ?? headers.get('x-real-ip') ?? 'anonymous'
  return `ip:${ip}`
}
