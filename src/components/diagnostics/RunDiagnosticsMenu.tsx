'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { diagnosticsTabHref } from '@/utils/diagnostics'
import { ChevronDown, Globe, Wand2 } from 'lucide-react'
import Link from 'next/link'
import type { RerunDiagnosticsButtonProps } from './RerunDiagnosticsButtonProps'

/** The split half of the run button: the domain and the record generator. */
export function RunDiagnosticsMenu({
  base,
}: Readonly<RerunDiagnosticsButtonProps>) {
  const item =
    'text-foreground hover:bg-muted inline-flex h-9 items-center gap-2 rounded-md px-2 text-sm transition-colors'
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="More run options"
          className="border-primary-foreground/25 hover:bg-foreground/10 focus-visible:ring-ring inline-flex w-9 cursor-pointer items-center justify-center border-l transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset"
        >
          <ChevronDown aria-hidden className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-56 flex-col gap-0.5 p-1">
        <Link
          href={`/domains/${encodeURIComponent(base.domain)}`}
          className={item}
        >
          <Globe aria-hidden className="text-muted-foreground h-4 w-4" />
          Domain overview
        </Link>
        <Link
          href={diagnosticsTabHref({ ...base, tab: 'generator' })}
          className={item}
        >
          <Wand2 aria-hidden className="text-muted-foreground h-4 w-4" />
          Generate records
        </Link>
      </PopoverContent>
    </Popover>
  )
}
