import { Panel } from '@/components/ui'
import { countActionableFindings } from '@/utils/diagnostics'
import { Activity } from 'lucide-react'
import { FindingCards } from './FindingCards'
import type { FindingsListProps } from './FindingsListProps'
import { FindingsTable } from './FindingsTable'

export function FindingsPanel({ findings, base }: Readonly<FindingsListProps>) {
  const actionable = countActionableFindings(findings)
  return (
    <Panel
      flush
      icon={<Activity />}
      title="Findings"
      description={`${String(findings.length)} checks from this DNS run, most urgent first`}
      actions={
        <span className="text-muted-foreground font-mono text-xs tabular-nums">
          {actionable} need action
        </span>
      }
    >
      <FindingsTable findings={findings} base={base} />
      <FindingCards findings={findings} base={base} />
    </Panel>
  )
}
