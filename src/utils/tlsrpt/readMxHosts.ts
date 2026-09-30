/**
 * The `mx-host` field of a policy. RFC 8460 defines it as an array; some
 * reporters send a single string.
 */
export function readMxHosts(value: unknown): string[] {
  const list = Array.isArray(value) ? value : [value]
  return list.filter(
    (host): host is string => typeof host === 'string' && host.trim() !== '',
  )
}
