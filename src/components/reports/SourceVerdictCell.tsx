import { StatusPill } from '@/components/ui'
import type { ReportSourceItemProps } from '@/types/reports'
import { dispositionTone } from '@/utils/reports'

/** DMARC result of a source, what the receiver did, and any override. */
export function SourceVerdictCell({ source }: Readonly<ReportSourceItemProps>) {
  const passes = source.spfAligned || source.dkimAligned
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <StatusPill tone={passes ? 'success' : 'danger'}>
        DMARC {passes ? 'pass' : 'fail'}
      </StatusPill>
      <StatusPill tone={dispositionTone(source.disposition)}>
        {source.disposition}
      </StatusPill>
      {source.overrideTypes.map((type) => (
        <StatusPill key={type} tone="info">
          {type.replaceAll('_', ' ')}
        </StatusPill>
      ))}
    </div>
  )
}
