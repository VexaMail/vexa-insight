import { LOOPBACK_HOSTS } from './loopbackHosts'

/**
 * Returns true when the request URL hostname is a loopback address.
 * Bracketed IPv6 hostnames are unwrapped before lookup.
 */
export function isLoopbackRequest(request: Request): boolean {
  try {
    const url = new URL(request.url)
    const host = url.hostname.replace(/^\[|\]$/g, '')
    return LOOPBACK_HOSTS.has(host)
  } catch {
    return false
  }
}
