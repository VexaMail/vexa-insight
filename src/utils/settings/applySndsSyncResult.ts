import type { SndsApiResult, SndsSyncResponse } from '@/types/settings'
import type { SndsConnectionPublic } from '@/types/snds'
import { describeSndsSync } from '@/utils/snds'

/**
 * Shows the outcome of a connect or sync call on the SNDS card. Returns
 * whether the call succeeded.
 */
export function applySndsSyncResult(
  result: SndsApiResult<SndsSyncResponse>,
  setConnection: (value: SndsConnectionPublic) => void,
  setMessage: (value: string) => void,
): boolean {
  if (!result.ok) {
    setMessage(result.message)
    return false
  }
  setConnection(result.data.connection)
  setMessage(describeSndsSync(result.data.sync))
  return true
}
