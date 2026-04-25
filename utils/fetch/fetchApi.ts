import { API_PATH } from './apiPath'
import { getBaseUrl } from './getBaseUrl'

/**
 * Fetches JSON from app-relative API path. For use in Server Components (same-origin).
 */
export async function fetchApi<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T }> {
  const base = path.startsWith('http') ? '' : getBaseUrl()
  const pathPart = path.startsWith('http') ? path : `${API_PATH}${path}`
  const url = base ? `${base}${pathPart}` : pathPart
  const res = await fetch(url, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }
  const json = (await res.json()) as { data: T }
  return json
}
