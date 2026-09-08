'use client'

import { Sparkles } from 'lucide-react'
import type { AiSettingsHeaderProps } from './AiSettingsHeaderProps'

export function AiSettingsHeader({ isConfigured }: AiSettingsHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="text-muted-foreground h-5 w-5" />
      <h2 className="text-xl font-semibold tracking-tight">AI Provider</h2>
      {isConfigured ? (
        <span className="bg-success/10 text-success rounded-full px-2 py-0.5 text-xs font-medium">
          Configured
        </span>
      ) : null}
    </div>
  )
}
