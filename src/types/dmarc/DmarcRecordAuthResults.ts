import type { DkimAuthResultPayload } from './DkimAuthResultPayload'
import type { SpfAuthResult } from './SpfAuthResult'

/**
 * Normalized `auth_results` of one record.
 */
export type DmarcRecordAuthResults = {
  spfAuthResult: SpfAuthResult
  dkimAuthResults: DkimAuthResultPayload[]
}
