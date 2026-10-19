import { StatusPill } from '@/components/ui'
import type { ReportKpiValueProps } from '@/types/reports'
import { Check, Minus, X } from 'lucide-react'

/** A KPI figure, then its pass, partial or fail pill when it has one. */
export function ReportKpiValue({
  value,
  verdict,
}: Readonly<ReportKpiValueProps>) {
  if (!verdict) return <>{value}</>
  const Icon =
    verdict.tone === 'success' ? Check : verdict.tone === 'danger' ? X : Minus
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {value}
      <StatusPill
        tone={verdict.tone}
        icon={<Icon />}
        className="font-sans tracking-normal"
      >
        {verdict.label}
      </StatusPill>
    </span>
  )
}
