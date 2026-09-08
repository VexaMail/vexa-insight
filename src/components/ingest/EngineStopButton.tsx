'use client'

import { Button } from '@/components/ui'
import type { EngineStopButtonProps } from '@/types/ingest'

/** Cancels the running ingest. Disabled without an API key to abort with. */
export function EngineStopButton({
  abortStatus,
  apiKey,
  onAbort,
}: EngineStopButtonProps) {
  const hasApiKey = apiKey.trim() !== ''

  return (
    <Button
      variant="destructive"
      size="sm"
      className="h-8 gap-1.5 px-3 text-xs"
      onClick={onAbort}
      disabled={abortStatus === 'loading' || !hasApiKey}
      title={hasApiKey ? undefined : 'Set API key in settings to stop the job'}
      aria-label="Stop running ingest job"
    >
      {abortStatus === 'loading' ? 'Canceling…' : 'Stop process'}
    </Button>
  )
}
