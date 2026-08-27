/**
 * Reads VEXA_IMAP_DEBUG. Default is disabled: the IMAP protocol trace carries
 * subjects, addresses and Message-IDs of every scanned message, which does not
 * belong in a production log.
 *
 * Reads `process.env` directly (not `env` from `@/lib/env`) because tests
 * mutate this variable at runtime; `env` is frozen after boot-time Zod parse
 * so it cannot pick up post-load mutations.
 */
export function isImapDebugEnabled(): boolean {
  const raw = process.env.VEXA_IMAP_DEBUG
  if (raw === undefined) return false
  const normalized = raw.trim().toLowerCase()
  return (
    normalized === 'true' ||
    normalized === '1' ||
    normalized === 'yes' ||
    normalized === 'on'
  )
}
