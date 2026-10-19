import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { policyModeLabel, policyTone } from '@/utils/domains'
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
      <p className="text-foreground font-mono text-3xl font-semibold">
        {value === null ? 'unknown' : `p=${value}`}
      </p>
      <p
        className={`text-sm font-medium ${STATUS_TONE_TEXT_CLASSES[policyTone(value)]}`}
      >
        {policyModeLabel(value)}
      </p>
      {policy ? <PolicyTags policy={policy} /> : null}
      <div className="border-border bg-secondary/50 text-muted-foreground mt-auto flex gap-2 rounded-md border p-2.5 text-xs">
        <Info className="text-info mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <p>
          Read from the latest aggregate report.{' '}
          <Link
            href={dnsHref}
            className="text-foreground underline underline-offset-2"
          >
            Check the live record
          </Link>
          .
        </p>
      </div>
    </DecisionTile>
  )
}
