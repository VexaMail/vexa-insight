import { StatusPill } from '@/components/ui'
import type { IngestionStatePillProps } from './IngestionStatePillProps'

/** Healthy, Running, Failing, Stalled or Not scheduled. */
export function IngestionStatePill({
  state,
}: Readonly<IngestionStatePillProps>) {
  if (state === 'healthy') {
    return (
      <StatusPill tone="success" dot>
        Healthy
      </StatusPill>
    )
  }
  if (state === 'running') {
    return (
      <StatusPill tone="info" dot>
        Running
      </StatusPill>
    )
  }
  if (state === 'failing') {
    return (
      <StatusPill tone="danger" dot>
        Failing
      </StatusPill>
    )
  }
  if (state === 'stalled') {
    return (
      <StatusPill tone="danger" dot>
        Stalled
      </StatusPill>
    )
  }
  return (
    <StatusPill tone="unknown" dot>
      Not scheduled
    </StatusPill>
  )
}
