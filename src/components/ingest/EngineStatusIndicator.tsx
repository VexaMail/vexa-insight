'use client'

import { Activity } from 'lucide-react'
import { getStatusClass } from './getStatusClass'
import { getStatusText } from './getStatusText'

export function EngineStatusIndicator({
  abortStatus,
  isRunning,
  runRequested,
}: Readonly<{
  abortStatus: string
  isRunning: boolean
  runRequested: boolean
}>) {
  const engineStatusClass = getStatusClass(abortStatus, isRunning, runRequested)
  const engineStatusText = getStatusText(abortStatus, isRunning, runRequested)

  return (
    <div
      className={`flex h-8 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-medium ${engineStatusClass}`}
    >
      <Activity className="h-3 w-3" aria-hidden="true" />
      {engineStatusText}
    </div>
  )
}
