import type { ImapAccountInstall } from '@/types/install'
import { isString } from '../../utils/install/isString'
import { MIN_SECRET_LENGTH } from '../../utils/install/minSecretLength'
import { parseAccountsList } from '../../utils/install/parseAccountsList'
import { parseIngestionDaysBack } from '../../utils/install/parseIngestionDaysBack'
import { parseIngestionInterval } from '../../utils/install/parseIngestionInterval'

export function validateSettings(o: Record<string, unknown>):
  | {
      secretKey: string
      imapAccounts: ImapAccountInstall[]
      ingestionIntervalMinutes?: number | undefined
      ingestionDaysBack: number
    }
  | { error: string } {
  const rawSecret = o.secretKey
  if (!isString(rawSecret) || rawSecret.trim().length < MIN_SECRET_LENGTH) {
    return {
      error: `secretKey must be at least ${MIN_SECRET_LENGTH} characters`,
    }
  }

  const accountsResult = parseAccountsList(o.imapAccounts)
  if ('error' in accountsResult) return accountsResult

  const ingestionIntervalMinutes = parseIngestionInterval(
    o.ingestionIntervalMinutes,
  )
  const ingestionDaysBack = parseIngestionDaysBack(o.ingestionDaysBack)

  return {
    secretKey: rawSecret.trim(),
    imapAccounts: accountsResult.accounts,
    ingestionIntervalMinutes,
    ingestionDaysBack,
  }
}
