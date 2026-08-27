export function buildProdCspDirectives(nonce: string): string[] {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // style-src keeps 'unsafe-inline': Recharts and framer-motion set inline
    // style attributes and next/font emits inline style elements, none of
    // which can carry a nonce.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.github.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ]
}
