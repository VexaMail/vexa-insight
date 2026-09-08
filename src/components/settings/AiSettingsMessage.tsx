'use client'

import { AlertCircle, CheckCircle } from 'lucide-react'
import type { AiSettingsMessageProps } from './AiSettingsMessageProps'

export function AiSettingsMessage({
  message,
  saveStatus,
}: AiSettingsMessageProps) {
  if (message === '') return null
  const isError = saveStatus === 'error'

  return (
    <div
      className={`flex items-center gap-2 text-sm font-medium ${
        isError ? 'text-danger' : 'text-success'
      }`}
    >
      {isError ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <span>{message}</span>
    </div>
  )
}
