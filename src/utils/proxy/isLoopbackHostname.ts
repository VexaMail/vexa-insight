/**
 * Reports whether a hostname addresses the machine the app runs on.
 *
 * Used to decide whether a URL derived from the incoming request actually
 * points at the local server rather than at a public hostname. The unspecified
 * addresses count too: a server started with `HOSTNAME=0.0.0.0` (to listen on
 * every interface, as a container behind a reverse proxy must) derives its
 * request URLs from that bind address.
 */
function isLoopbackHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '::1' ||
    hostname === '[::1]' ||
    hostname === '0.0.0.0' ||
    hostname === '[::]'
  )
}

export { isLoopbackHostname }
