import type { Logger } from 'imapflow'
import { isImapDebugEnabled } from './isImapDebugEnabled'

/**
 * Builds the logger handed to ImapFlow. IMAP protocol traces contain subjects,
 * addresses and Message-IDs, so debug/info output is dropped unless
 * VEXA_IMAP_DEBUG is enabled. Warnings and errors always reach the console.
 */
export function createImapLogger(): Logger {
  const debugEnabled = isImapDebugEnabled()
  return {
    debug: (obj: unknown) => {
      if (debugEnabled) console.debug('[imap]', obj)
    },
    info: (obj: unknown) => {
      if (debugEnabled) console.info('[imap]', obj)
    },
    warn: (obj: unknown) => {
      console.warn('[imap]', obj)
    },
    error: (obj: unknown) => {
      console.error('[imap]', obj)
    },
  }
}
