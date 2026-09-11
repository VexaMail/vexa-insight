import type { ImapAccountInstall } from '@/types/install'
import { parseAccountsList } from '../../utils/install/parseAccountsList'
import { parseIngestionDaysBack } from '../../utils/install/parseIngestionDaysBack'
import { parseIngestionInterval } from '../../utils/install/parseIngestionInterval'

export function validateSettings(o: Record<string, unknown>):
  | {
      imapAccounts: ImapAccountInstall[]
      ingestionIntervalMinutes?: number | undefined
      ingestionDaysBack: number
    }
  | { error: string } {
  const accountsResult = parseAccountsList(o['imapAccounts'])
  if ('error' in accountsResult) return accountsResult

  const ingestionIntervalMinutes = parseIngestionInterval(
    o['ingestionIntervalMinutes'],
  )
  const ingestionDaysBack = parseIngestionDaysBack(o['ingestionDaysBack'])

  return {
    imapAccounts: accountsResult.accounts,
    ingestionIntervalMinutes,
    ingestionDaysBack,
  }
}
