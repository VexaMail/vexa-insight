import type { PublicReportProps } from '../../types/public-check/PublicReportProps'

export function PublicReportSummary({ report }: Readonly<PublicReportProps>) {
  const attention = report.checks.filter(
    (check) => check.status === 'attention',
  ).length
  const notes = report.checks.filter((check) => check.status === 'info').length
  const unverified = report.checks.filter(
    (check) => check.status === 'unknown',
  ).length
  return (
    <p className="text-muted-foreground mb-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      <span>
        <strong className="text-foreground">{attention}</strong> need attention
      </span>
      <span>
        <strong className="text-foreground">{notes}</strong> policy notes
      </span>
      <span>
        <strong className="text-foreground">{unverified}</strong> not verified
      </span>
    </p>
  )
}
