'use client'

import { Panel } from '@/components/ui'
import type { CronsEngineCardProps } from '@/types/ingest'
import { Activity } from 'lucide-react'
import { EngineHeader } from './EngineHeader'
import { EngineProgress } from './EngineProgress'

/**
 * Ingestion health: the server-read facts and overall state on the left,
 * run now, rescan or stop on the right, live progress while a run is up.
 */
export function CronsEngineCard({
  initialApiKey,
  isRunning,
  runRequested,
  abortStatus,
  onAbort,
  currentProcessed,
  totalEmails,
  processingEmails,
  ratePerSecond,
  etaFormatted,
  statusText,
  healthPill,
  healthFacts,
  idleAction,
}: CronsEngineCardProps) {
  return (
    <Panel
      icon={<Activity />}
      title="Ingestion health"
      description="Whether reports are still arriving, and a run on demand."
      actions={healthPill}
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-6">
        <div className="min-w-0">
          {healthFacts}
          {isRunning || runRequested ? (
            <EngineProgress
              currentProcessed={currentProcessed}
              totalEmails={totalEmails}
              processingEmails={processingEmails}
              ratePerSecond={ratePerSecond}
              etaFormatted={etaFormatted}
              statusText={statusText}
            />
          ) : null}
        </div>
        <EngineHeader
          initialApiKey={initialApiKey}
          isRunning={isRunning}
          runRequested={runRequested}
          abortStatus={abortStatus}
          onAbort={onAbort}
          idleAction={idleAction}
        />
      </div>
    </Panel>
  )
}
