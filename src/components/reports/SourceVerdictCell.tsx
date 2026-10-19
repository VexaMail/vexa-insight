import { StatusPill } from '@/components/ui'
import type { ReportSourceItemProps } from '@/types/reports'
import { dispositionTone } from '@/utils/reports'
import { ResultPill } from './ResultPill'

/** DMARC result of a source, what the receiver did, and any override. */
export function SourceVerdictCell({ source }: Readonly<ReportSourceItemProps>) {
  const passes = source.spfAligned || source.dkimAligned
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <ResultPill tone={passes ? 'success' : 'danger'}>
        DMARC {passes ? 'pass' : 'fail'}
      </ResultPill>
      <StatusPill
        tone={dispositionTone(source.disposition)}
        title="What the receiver did with these messages"
      >
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
