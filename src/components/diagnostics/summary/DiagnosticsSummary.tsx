import { DiagnosticsScorePanel } from './DiagnosticsScorePanel'
import type { DiagnosticsSummaryProps } from './DiagnosticsSummaryProps'
import { ProtocolStatusTiles } from './ProtocolStatusTiles'

/** The score card next to one status tile per protocol. */
export function DiagnosticsSummary(props: Readonly<DiagnosticsSummaryProps>) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]">
      <DiagnosticsScorePanel {...props} />
      <ProtocolStatusTiles findings={props.findings} base={props.base} />
    </div>
  )
}
