import { SOURCE_CAUSE_LABELS, SOURCE_CAUSE_TONES } from '@/constants/ips'
import type { IpReputationStatus, SourceCause } from '@/types/ips'

/** The stored-results heuristic of a source as a context signal. */
export function describeCauseSignal(cause: SourceCause): IpReputationStatus {
  return {
    value: SOURCE_CAUSE_LABELS[cause],
    label: cause === 'unknown' ? 'Too little data' : 'From reports',
    tone: SOURCE_CAUSE_TONES[cause],
  }
}
