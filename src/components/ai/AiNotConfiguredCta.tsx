'use client'

import { Button, IconTile } from '@/components/ui'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function AiNotConfiguredCta() {
  return (
    <div className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <IconTile>
          <Sparkles />
        </IconTile>
        <div className="min-w-0">
          <h3 className="text-foreground text-sm font-semibold">AI insights</h3>
          <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
            Explanations of authentication results, alignment issues and the
            next action to take. Configure an AI provider in Settings to enable
            them.
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="h-10 shrink-0">
        <Link href="/settings">
          Configure in Settings
          <ArrowRight aria-hidden="true" />
        </Link>
      </Button>
    </div>
  )
}
