import type { SourceSeverityDotProps } from './SourceSeverityDotProps'
import { deriveSourceSeverity } from './deriveSourceSeverity'
import { SEVERITY_DOT_STYLES } from './severityDotStyles'

export function SourceSeverityDot({
  spfAligned,
  dkimAligned,
}: Readonly<SourceSeverityDotProps>) {
  const severity = deriveSourceSeverity(spfAligned, dkimAligned)

  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${SEVERITY_DOT_STYLES[severity]}`}
      title={severity}
      aria-label={`Severity: ${severity}`}
    />
  )
}
