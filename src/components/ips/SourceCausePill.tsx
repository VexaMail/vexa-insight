import { StatusPill } from '@/components/ui'
import {
  SOURCE_CAUSE_HINTS,
  SOURCE_CAUSE_ICONS,
  SOURCE_CAUSE_LABELS,
  SOURCE_CAUSE_TONES,
} from '@/constants/ips'
import type { SourceCausePillProps } from '@/types/ips'

/** Why a source passes or fails DMARC, as a pill with the reason on hover. */
export function SourceCausePill({ cause }: Readonly<SourceCausePillProps>) {
  const Icon = SOURCE_CAUSE_ICONS[cause]
  return (
    <StatusPill
      tone={SOURCE_CAUSE_TONES[cause]}
      icon={<Icon />}
      title={SOURCE_CAUSE_HINTS[cause]}
    >
      {SOURCE_CAUSE_LABELS[cause]}
    </StatusPill>
  )
}
