'use client'

import type { EngineHeaderProps } from '@/types/ingest'
import { Activity } from 'lucide-react'
import { EngineStatusIndicator } from './EngineStatusIndicator'
import { EngineStopButton } from './EngineStopButton'
import TriggerPollForm from './TriggerPollForm'

/** Title row: run or stop the engine, plus the live status indicator. */
export function EngineHeader({
  initialApiKey,
  isRunning,
  runRequested,
  abortStatus,
  onAbort,
}: EngineHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Activity className="text-primary h-4 w-4" />
        <h3 className="font-display text-foreground text-sm font-semibold">
          Ingest engine
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {isRunning || runRequested ? (
          <EngineStopButton
            abortStatus={abortStatus}
            apiKey={initialApiKey}
            onAbort={onAbort}
          />
        ) : (
          <TriggerPollForm
            className="m-0"
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
    </div>
  )
}
