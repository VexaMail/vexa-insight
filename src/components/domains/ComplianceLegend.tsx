import type { ComplianceLegendProps } from './ComplianceLegendProps'

/** Passed and failed counts with their colour dots, and the denominator. */
export function ComplianceLegend({ summary }: Readonly<ComplianceLegendProps>) {
  return (
    <div className="space-y-1 text-[13px] tabular-nums">
      <p className="text-foreground flex items-center gap-2">
        <span aria-hidden className="bg-success h-2 w-2 rounded-full" />
        {summary.passedCount.toLocaleString('en-US')} passed
      </p>
      <p className="text-foreground flex items-center gap-2">
        <span aria-hidden className="bg-danger h-2 w-2 rounded-full" />
        {summary.failedCount.toLocaleString('en-US')} failed
      </p>
      <p className="text-muted-foreground text-xs">
        DMARC, of {summary.totalMessages.toLocaleString('en-US')} messages
      </p>
    </div>
  )
}
