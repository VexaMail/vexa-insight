/**
 * Reports whether a hostname addresses the machine the app runs on.
 *
 * Used to decide whether a URL derived from the incoming request actually
 * points at the local server rather than at a public hostname.
 */
function isLoopbackHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '[::1]'
  )
}

export { isLoopbackHostname }
