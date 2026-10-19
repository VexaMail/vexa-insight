'use client'

import type { EngineHeaderProps } from '@/types/ingest'
import { EngineStatusIndicator } from './EngineStatusIndicator'
import { EngineStopButton } from './EngineStopButton'
import TriggerPollForm from './TriggerPollForm'

/** The engine's actions: run now and rescan, or stop the running job. */
export function EngineHeader({
  initialApiKey,
  isRunning,
  runRequested,
  abortStatus,
  onAbort,
}: EngineHeaderProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2 md:pt-1">
      {isRunning || runRequested ? (
        <EngineStopButton
          abortStatus={abortStatus}
          apiKey={initialApiKey}
          onAbort={onAbort}
        />
      ) : (
        <TriggerPollForm
          hideApiKeyWhenPrefilled
          initialApiKey={initialApiKey}
        />
      )}
      <EngineStatusIndicator
        abortStatus={abortStatus}
        isRunning={isRunning}
        runRequested={runRequested}
      />
    </div>
  )
}
