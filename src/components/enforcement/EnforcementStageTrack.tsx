import { Panel } from '@/components/ui'
import { Route } from 'lucide-react'
import type { EnforcementStageTrackProps } from './EnforcementStageTrackProps'
import { StageStep } from './StageStep'

/** Observe, identify, fix, quarantine, reject: where the domain stands. */
export function EnforcementStageTrack({
  stages,
}: Readonly<EnforcementStageTrackProps>) {
  const done = stages.every((stage) => stage.state === 'done')
  return (
    <Panel
      icon={<Route />}
      title="Path to enforcement"
      description={
        done
          ? 'The domain rejects failing mail at full coverage. A guide derived from the published policy and the last 30 days of reports, not a certification.'
          : 'A guide derived from the published policy and the last 30 days of reports, not a certification.'
      }
    >
      <ol className="flex flex-col gap-2 lg:flex-row">
        {stages.map((stage, index) => (
          <StageStep key={stage.key} stage={stage} index={index} />
        ))}
      </ol>
    </Panel>
  )
}
