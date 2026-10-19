'use client'

import type { EngineHeaderProps } from '@/types/ingest'
import { EngineStatusIndicator } from './EngineStatusIndicator'
import { EngineStopButton } from './EngineStopButton'
import TriggerPollForm from './TriggerPollForm'

/**
 * The engine's actions: run now and rescan, or stop the running job; an
 * idle action replaces run now when a run could not fetch anything.
 */
export function EngineHeader({
  initialApiKey,
  isRunning,
  runRequested,
  abortStatus,
  onAbort,
  idleAction,
}: EngineHeaderProps) {
  return (
    <div className="order-first flex min-w-0 flex-col gap-2 md:order-none md:pt-1">
      {isRunning || runRequested ? (
        <EngineStopButton
          abortStatus={abortStatus}
          apiKey={initialApiKey}
          onAbort={onAbort}
        />
      ) : (
        (idleAction ?? (
          <TriggerPollForm
            hideApiKeyWhenPrefilled
            initialApiKey={initialApiKey}
          />
        ))
      )}
      <EngineStatusIndicator
        abortStatus={abortStatus}
        isRunning={isRunning}
        runRequested={runRequested}
      />
    </div>
  )
}
