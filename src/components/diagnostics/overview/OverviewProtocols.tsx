import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'
import { ProtocolDots } from './ProtocolDots'

/** The protocol dots, or why there are none to show. */
export function OverviewProtocols({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  const { check } = row
  if (!check) {
    return (
      <span className="text-muted-foreground text-xs">
        Waiting for the first DNS run.
      </span>
    )
  }
  if (check.resolved) return <ProtocolDots findings={check.protocols} />
  return (
    <span className="text-muted-foreground text-xs">
      The NS lookup returned nothing: the domain may not exist, or the resolver
      timed out. Open it to run the checks again.
    </span>
  )
}
