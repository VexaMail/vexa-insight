import { ENFORCEMENT_THRESHOLDS } from '@/constants/enforcement'
import type {
  EnforcementReadiness,
  EnforcementSourceInput,
} from '@/types/enforcement'
import { countFailingSourcesByKind } from './countFailingSourcesByKind'
import { enforcementVerdict } from './enforcementVerdict'
import { sumFailingMessagesByKind } from './sumFailingMessagesByKind'
import { toFailingSource } from './toFailingSource'

/**
 * Simulates enforcement over a window of reports: every DMARC-failing message
 * would be quarantined or rejected, and the failures are split into
 * legitimate, forwarded and unknown traffic to judge whether that is safe.
 */
export function computeEnforcementReadiness(
  sources: readonly EnforcementSourceInput[],
  window: { days: number; reportDays: number },
): EnforcementReadiness {
  const failing = sources
    .map(toFailingSource)
    .filter((s) => s.failingMessages > 0)
    .sort((a, b) => b.failingMessages - a.failingMessages)
  const failingByKind = sumFailingMessagesByKind(failing)
  const totalMessages = sources.reduce((n, s) => n + s.messages, 0)
  const passingMessages = sources.reduce((n, s) => n + s.passingMessages, 0)
  const legitimateFailureRate =
    totalMessages === 0 ? 0 : failingByKind.legitimate / totalMessages

  return {
    ...window,
    totalMessages,
    passingMessages,
    failingMessages: totalMessages - passingMessages,
    failingByKind,
    failingSourcesByKind: countFailingSourcesByKind(failing),
    legitimateFailureRate,
    verdict: enforcementVerdict({
      totalMessages,
      reportDays: window.reportDays,
      legitimateFailureRate,
    }),
    topFailingSources: failing.slice(0, ENFORCEMENT_THRESHOLDS.topSources),
  }
}
