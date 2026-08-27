/**
 * Returns true if the error indicates the IMAP connection is no longer available
 * (e.g. server closed the connection, network drop). Used to trigger reconnect-and-retry.
 */
export function isNoConnectionError(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  const code = (err as Error & { code?: string }).code
  return (
    code === 'NoConnection' ||
    err.message.includes('Connection not available') ||
    err.message.includes('Connection closed')
  )
}
