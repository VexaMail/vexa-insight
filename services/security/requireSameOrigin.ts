import { SAFE_METHODS } from './safeMethods'
import { sameOriginRejection } from './sameOriginRejection'

export function requireSameOrigin(
  request: Request,
): { status: 403; error: { code: string; message: string } } | null {
  if (SAFE_METHODS.has(request.method.toUpperCase())) return null
  const site = request.headers.get('sec-fetch-site')
  if (site === 'same-origin' || site === 'same-site' || site === 'none') {
    return null
  }
  if (site) {
    return sameOriginRejection()
  }
  const origin = request.headers.get('origin')
  if (origin) {
    try {
      const reqUrl = new URL(request.url)
      const o = new URL(origin)
      if (o.host === reqUrl.host) return null
    } catch {
      // fall through to reject
    }
  }
  return sameOriginRejection()
}
