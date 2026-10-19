import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'
import { ProtocolDots } from './ProtocolDots'

/** The protocol dots, or why there are none to show. */
export function OverviewProtocols({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  if (row.resolved) return <ProtocolDots findings={row.findings} />
  return (
    <span className="text-muted-foreground text-xs">
      The NS lookup returned nothing: the domain may not exist, or the resolver
      timed out. Open it to run the checks again.
    </span>
  )
}
