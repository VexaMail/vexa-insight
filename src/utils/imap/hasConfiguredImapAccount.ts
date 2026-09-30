import type { AppConfig } from '@/types/config'

/** Whether the first mailbox is complete enough for the scheduler to poll it. */
export function hasConfiguredImapAccount(config: AppConfig): boolean {
  const first = config.imapAccounts[0]
  return Boolean(first && first.server && first.username && first.password)
}
