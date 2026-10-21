import type { PublicReportProps } from '../../types/public-check/PublicReportProps'

export function PublicReportInterpretation({
  report,
}: Readonly<PublicReportProps>) {
  const next =
    report.checks.find((check) => check.status === 'attention') ??
    report.checks.find((check) => check.status === 'info') ??
    report.checks.find((check) => check.status === 'unknown')
  return (
    <div className="mb-6 max-w-prose">
      <p className="text-sm font-medium">
        Published DNS configuration. Actual message authentication is not
        verified.
      </p>
      {next ? (
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          <strong className="text-foreground">Next step · {next.name}: </strong>
          {next.recommendation}
        </p>
      ) : null}
    </div>
  )
}
