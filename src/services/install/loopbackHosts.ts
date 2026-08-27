/**
 * Hostnames considered loopback for the install gate. Requests resolving to
 * any other host are rejected unless VEXA_ALLOW_REMOTE_INSTALL=1.
 */
export const LOOPBACK_HOSTS: ReadonlySet<string> = new Set([
  'localhost',
  '127.0.0.1',
  '::1',
  '0.0.0.0',
])
