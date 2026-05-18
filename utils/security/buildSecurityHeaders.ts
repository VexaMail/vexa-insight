import { buildContentSecurityPolicy } from './buildContentSecurityPolicy'

export function buildSecurityHeaders(isProd: boolean): Array<{
  key: string
  value: string
}> {
  const headers: Array<{ key: string; value: string }> = [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), payment=()',
    },
    {
      key: 'Content-Security-Policy',
      value: buildContentSecurityPolicy(isProd),
    },
  ]
  if (isProd) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    })
  }
  return headers
}
