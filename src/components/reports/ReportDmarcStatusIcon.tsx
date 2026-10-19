import { describeDmarcOutcome } from '@/utils/reports'
import { AlertTriangle, CheckCircle2, FileText, XCircle } from 'lucide-react'
import type { ReportDmarcStatusIconProps } from './ReportDmarcStatusIconProps'

/**
 * Green check when every message aligns on SPF and DKIM, amber warning when
 * DMARC passes on only one of them, red when any message fails DMARC.
 */
export function ReportDmarcStatusIcon({
  outcome,
}: Readonly<ReportDmarcStatusIconProps>) {
  if (outcome === undefined || outcome.totalMessages === 0) {
    return (
      <FileText
        className="text-muted-foreground h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      />
    )
  }

  const description = describeDmarcOutcome(outcome)
  if (outcome.failingMessages > 0) {
    return (
      <XCircle
        className="h-3.5 w-3.5 shrink-0 text-red-500 dark:text-red-400"
        role="img"
        aria-label={description}
      >
        <title>{description}</title>
      </XCircle>
    )
  }

  if (outcome.partiallyAlignedMessages > 0) {
    return (
      <AlertTriangle
        className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400"
        role="img"
        aria-label={description}
      >
        <title>{description}</title>
      </AlertTriangle>
    )
  }

  return (
    <CheckCircle2
      className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
      role="img"
      aria-label={description}
    >
      <title>{description}</title>
    </CheckCircle2>
  )
}
