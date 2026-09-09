'use client'

import type { CronsEngineCardProps } from '@/types/ingest'
import { m as motion } from 'framer-motion'
import { EngineHeader } from './EngineHeader'
import { EngineProgress } from './EngineProgress'
import { EngineSummary } from './EngineSummary'

export function CronsEngineCard({
  initialApiKey,
  isRunning,
  runRequested,
  abortStatus,
  onAbort,
  scheduleText,
  lastRunFormatted,
  currentProcessed,
  totalEmails,
  processingEmails,
  ratePerSecond,
  etaFormatted,
  statusText,
}: CronsEngineCardProps) {
  const isActive = isRunning || runRequested

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card-hover p-5"
    >
      <EngineHeader
        initialApiKey={initialApiKey}
        isRunning={isRunning}
        runRequested={runRequested}
        abortStatus={abortStatus}
        onAbort={onAbort}
      />
      <EngineSummary
        scheduleText={scheduleText}
        lastRunFormatted={lastRunFormatted}
        currentProcessed={currentProcessed}
        isRunning={isRunning}
        runRequested={runRequested}
      />

      {isActive ? (
        <EngineProgress
          currentProcessed={currentProcessed}
          totalEmails={totalEmails}
          processingEmails={processingEmails}
          ratePerSecond={ratePerSecond}
          etaFormatted={etaFormatted}
          statusText={statusText}
        />
      ) : null}
    </motion.div>
  )
}
