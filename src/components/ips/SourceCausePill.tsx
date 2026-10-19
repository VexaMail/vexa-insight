import { StatusPill } from '@/components/ui'
import {
  SOURCE_CAUSE_HINTS,
  SOURCE_CAUSE_LABELS,
  SOURCE_CAUSE_TONES,
} from '@/constants/ips'
import type { SourceCausePillProps } from '@/types/ips'

/** Why a source passes or fails DMARC, as a pill with the reason on hover. */
export function SourceCausePill({ cause }: Readonly<SourceCausePillProps>) {
  return (
    <span title={SOURCE_CAUSE_HINTS[cause]}>
      <StatusPill tone={SOURCE_CAUSE_TONES[cause]} dot>
        {SOURCE_CAUSE_LABELS[cause]}
      </StatusPill>
    </span>
  )
}
