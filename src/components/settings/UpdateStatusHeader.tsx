'use client'

import { Button } from '@/components/ui'
import { CheckCircle2, RefreshCw, Sparkles } from 'lucide-react'
import type { UpdateStatusHeaderProps } from './UpdateStatusHeaderProps'

/** Status icon, heading and the "Check now" button of the updates card. */
export function UpdateStatusHeader({
  updateAvailable,
  isRefreshing,
  isLoading,
  apiKey,
  onRefresh,
}: UpdateStatusHeaderProps) {
  const headerIconClass = updateAvailable
    ? 'bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg'
    : 'bg-success/10 text-success flex h-8 w-8 items-center justify-center rounded-lg'
  const refreshIconClass = isRefreshing
    ? 'mr-1.5 h-3.5 w-3.5 animate-spin'
    : 'mr-1.5 h-3.5 w-3.5'

  return (
    <div className="mb-4 flex items-center gap-2">
      <div className={headerIconClass}>
        {updateAvailable ? (
          <Sparkles className="h-4 w-4" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1">
        <h2
          id="settings-updates-heading"
          className="font-display text-foreground text-sm font-semibold"
        >
          Updates
        </h2>
        <p className="text-muted-foreground text-xs">
          Compares your installed version with the latest GitHub release.
          Notification only — never auto-applied.
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing || isLoading || !apiKey.trim()}
      >
        <RefreshCw className={refreshIconClass} />
        {isRefreshing ? 'Checking…' : 'Check now'}
      </Button>
    </div>
  )
}
