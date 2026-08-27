import type { ImapAccountInstall } from '@/types/install'
import { parseImapAccount } from './parseImapAccount'

export function parseAccountsList(
  rawAccounts: unknown,
): { accounts: ImapAccountInstall[] } | { error: string } {
  if (!Array.isArray(rawAccounts) || rawAccounts.length === 0) {
    return { error: 'imapAccounts must be a non-empty array' }
  }
  const imapAccounts: ImapAccountInstall[] = []
  for (let i = 0; i < rawAccounts.length; i++) {
    const acc = parseImapAccount(rawAccounts[i], i)
    if (!acc) {
      return {
        error: `imapAccounts[${String(i)}] must have server, username, and password`,
      }
    }
    imapAccounts.push(acc)
  }
  return { accounts: imapAccounts }
}
