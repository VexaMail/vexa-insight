'use client'

import { IconTile } from '@/components/ui'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

/** One compact row while no AI provider is set: what it is and where to set it. */
export default function AiNotConfiguredCta() {
  return (
    <div className="glass-card flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5">
      <IconTile size="sm" tone="unknown">
        <Sparkles />
      </IconTile>
      <p className="text-muted-foreground min-w-0 flex-1 text-xs">
        <span className="text-foreground font-semibold">AI insights</span> are
        off: no AI provider is configured.
      </p>
      <Link
        href="/settings#ai"
        className="text-primary inline-flex min-h-10 shrink-0 items-center gap-1 text-xs font-medium hover:underline"
      >
        Configure in Settings
        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
