import { ENFORCEMENT_THRESHOLDS } from '@/constants/enforcement'
import type {
  EnforcementSourceInput,
  FailingTrafficKind,
} from '@/types/enforcement'

/** How one source's failing mail is read; see `FailingTrafficKind`. */
export function classifyFailingTraffic(
  source: EnforcementSourceInput,
): FailingTrafficKind {
  const category = source.sender?.category
  if (category === 'mailing-list' || category === 'mailbox-provider') {
    return 'forwarded'
  }
  const passRate =
    source.messages === 0 ? 0 : source.passingMessages / source.messages
  if (passRate >= ENFORCEMENT_THRESHOLDS.legitimatePassRate) return 'legitimate'
  if (category !== undefined) return 'legitimate'
  return 'unknown'
}
