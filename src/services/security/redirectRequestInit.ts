/**
 * Derive the RequestInit for the next hop of a redirect chain. Mirrors what
 * browsers do: a 303 turns any non-GET/HEAD request into a body-less GET, and
 * so do 301/302 when the original method was POST. 307/308 replay the request
 * unchanged. The body-describing headers are dropped along with the body.
 */
export function redirectRequestInit(
  init: Omit<RequestInit, 'signal'>,
  status: number,
): Omit<RequestInit, 'signal'> {
  const method = (init.method ?? 'GET').toUpperCase()
  const switchToGet =
    status === 303
      ? method !== 'GET' && method !== 'HEAD'
      : (status === 301 || status === 302) && method === 'POST'
  if (!switchToGet) return init

  const headers = new Headers(init.headers)
  headers.delete('content-type')
  headers.delete('content-length')
  headers.delete('content-encoding')
  return { ...init, method: 'GET', body: null, headers }
}
