import type { DkimAuthResultPayload } from './DkimAuthResultPayload'
import type { PolicyOverridePayload } from './PolicyOverridePayload'
import type { SpfAuthResult } from './SpfAuthResult'

/**
 * One normalized event payload from parsed DMARC XML.
 * `ip` is used to resolve/upsert the ip_addresses FK and is not stored directly.
 */
export type NormalizedEventPayload = {
  sourceIp: string // used to call upsertIp — not persisted on normalized_events
  spfResult: string
  dkimResult: string
  spfAuthResult: SpfAuthResult
  dkimAuthResults: DkimAuthResultPayload[]
  policyOverrides: PolicyOverridePayload[]
  spfAligned: boolean
  dkimAligned: boolean
  disposition: string
  count: number
  reportBeginDate: number
  reportEndDate: number
}
