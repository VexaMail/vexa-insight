import { StatusPill } from '@/components/ui'
import type { ReportKpiVerdictProps } from '@/types/reports'
import { Check, Minus, X } from 'lucide-react'

/** The pass, partial or fail verdict of a report KPI, as a solid badge. */
export function ReportKpiVerdict({ verdict }: Readonly<ReportKpiVerdictProps>) {
  const Icon =
    verdict.tone === 'success' ? Check : verdict.tone === 'danger' ? X : Minus
  return (
    <StatusPill variant="solid" tone={verdict.tone} icon={<Icon />}>
      {verdict.label}
    </StatusPill>
  )
}
