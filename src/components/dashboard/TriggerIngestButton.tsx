'use client'

import { Button } from '@/components/ui'
import { useTriggerIngest } from '@/hooks/dashboard'
import { Play, RotateCw } from 'lucide-react'
import type { TriggerIngestButtonProps } from './TriggerIngestButtonProps'

/** Runs ingestion now; only rendered for admins, who hold the API key. */
export function TriggerIngestButton({
  apiKey,
  disabledReason,
}: Readonly<TriggerIngestButtonProps>) {
  const { status, message, trigger } = useTriggerIngest(apiKey)
  const isLoading = status === 'loading'
  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        className="h-10 w-full gap-2"
        disabled={isLoading || disabledReason !== null}
        title={disabledReason ?? undefined}
        onClick={trigger}
      >
        {isLoading ? (
          <RotateCw aria-hidden className="h-4 w-4 animate-spin" />
        ) : (
          <Play aria-hidden className="h-4 w-4" />
        )}
        Trigger now
      </Button>
      <p
        role="status"
        className={
          status === 'error'
            ? 'text-danger text-xs'
            : 'text-muted-foreground text-xs'
        }
      >
        {message || disabledReason}
      </p>
    </div>
  )
}
