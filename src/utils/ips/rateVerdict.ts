import { SOURCE_CAUSE_FAIL_RATE, SOURCE_CAUSE_PASS_RATE } from '@/constants/ips'
import type { RateVerdict } from '@/types/ips'

/** Pass at or above 98%, fail at or below 2%, partial in between. */
export function rateVerdict(rate: number, total: number): RateVerdict {
  if (total === 0) return { label: 'No data', tone: 'unknown' }
  if (rate >= SOURCE_CAUSE_PASS_RATE) return { label: 'Pass', tone: 'success' }
  if (rate <= SOURCE_CAUSE_FAIL_RATE) return { label: 'Fail', tone: 'danger' }
  return { label: 'Partial', tone: 'warning' }
}
