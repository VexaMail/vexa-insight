'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { diagnosticsSectionHref } from '@/utils/diagnostics'
import { ArrowRight, Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { CopyButton } from '../shared'
import type { FindingLinkProps } from './FindingLinkProps'

/** Copy the record to publish, when there is one, and open the evidence. */
export function FindingMoreMenu({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`More actions for ${finding.check}`}
          className="text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
        >
          <Ellipsis aria-hidden className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-48 flex-col gap-0.5 p-1">
        {finding.fix === null ? null : (
          <CopyButton text={finding.fix.value} label="Copy record" />
        )}
        <Link
          href={diagnosticsSectionHref(base, finding.section)}
          className="text-foreground hover:bg-muted inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs transition-colors"
        >
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          View details
        </Link>
      </PopoverContent>
    </Popover>
  )
}
