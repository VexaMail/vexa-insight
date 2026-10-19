import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { policyEffectNote, policyModeLabel, policyTone } from '@/utils/domains'
import { FileText, Info } from 'lucide-react'
import Link from 'next/link'
import { DecisionTile } from './DecisionTile'
import { PolicyTags } from './PolicyTags'
import type { PolicyTileProps } from './PolicyTileProps'

/** The published DMARC policy, as the latest aggregate report quoted it. */
export function PolicyTile({ policy, dnsHref }: Readonly<PolicyTileProps>) {
  const value = policy?.policy ?? null
  return (
    <DecisionTile icon={<FileText />} title="DMARC policy">
      <div>
        <p className="text-foreground font-mono text-3xl leading-tight font-semibold tracking-tight">
          {value === null ? 'unknown' : `p=${value}`}
        </p>
        <p
          className={cn(
            'text-base font-medium',
            STATUS_TONE_TEXT_CLASSES[policyTone(value)],
          )}
        >
          {policyModeLabel(value)}
        </p>
      </div>
      {policy ? <PolicyTags policy={policy} /> : null}
      <div className="border-info/30 bg-info/10 text-muted-foreground mt-auto flex gap-2 rounded-md border p-3 text-xs">
        <Info className="text-info mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          <span className="text-foreground">{policyEffectNote(value)}</span>{' '}
          <Link
            title="The policy above is read from the latest aggregate report"
            href={dnsHref}
            className="text-foreground underline underline-offset-2"
          >
            Check the live record
          </Link>
        </p>
      </div>
    </DecisionTile>
  )
}
