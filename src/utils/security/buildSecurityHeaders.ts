import { buildDevContentSecurityPolicy } from './buildDevContentSecurityPolicy'

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
  ]
  if (isProd) {
    // In production the per-request nonce CSP is set by the proxy
    // (utils/proxy/applyProdCspHeaders.ts), not by static headers.
    headers.push({
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    })
  } else {
    headers.push({
      key: 'Content-Security-Policy',
      value: buildDevContentSecurityPolicy(),
    })
  }
  return headers
}
