'use client'

import type { AiErrorStateProps } from './AiErrorStateProps'

export default function AiErrorState({
  message,
  onRetry,
}: Readonly<AiErrorStateProps>) {
  return (
    <div className="border-danger/30 bg-danger/10 rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg" aria-hidden="true">
          ⚠
        </span>
        <div>
          <p className="text-danger text-sm font-medium">{message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="bg-danger/10 text-danger hover:bg-danger/20 mt-2 rounded-md px-3 py-1.5 text-xs font-medium transition print:hidden"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
