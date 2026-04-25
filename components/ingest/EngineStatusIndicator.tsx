'use client'

import { CheckCircle } from 'lucide-react'
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
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${engineStatusClass}`}
    >
      <CheckCircle className="h-3 w-3" />
      {engineStatusText}
    </div>
  )
}
