import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { policyEffectNote, policyTone } from '@/utils/domains'
import { FileText } from 'lucide-react'
import { DecisionTile } from './DecisionTile'
import { PolicyTags } from './PolicyTags'
import type { PolicyTileProps } from './PolicyTileProps'
import { TileLinkButton } from './TileLinkButton'

/** The published DMARC policy, as the latest aggregate report quoted it. */
export function PolicyTile({ policy, dnsHref }: Readonly<PolicyTileProps>) {
  const value = policy?.policy ?? null
  return (
    <DecisionTile icon={<FileText />} title="DMARC policy" href={dnsHref}>
      <p
        className={cn(
          'font-mono text-3xl leading-tight font-semibold tracking-tight',
          value === 'none'
            ? 'text-foreground'
            : STATUS_TONE_TEXT_CLASSES[policyTone(value)],
        )}
        title="Read from the latest aggregate report"
      >
        {value === null ? 'unknown' : `p=${value}`}
      </p>
      <p className="text-muted-foreground text-sm">{policyEffectNote(value)}</p>
      {policy ? <PolicyTags policy={policy} /> : null}
      <TileLinkButton href={dnsHref} className="mt-auto">
        View DNS record
      </TileLinkButton>
    </DecisionTile>
  )
}
