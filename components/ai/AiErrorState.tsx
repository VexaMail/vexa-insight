'use client'

import type { AiErrorStateProps } from './AiErrorStateProps'

export default function AiErrorState({
  message,
  onRetry,
}: Readonly<AiErrorStateProps>) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-900/10">
      <div className="flex items-start gap-3">
        <span className="text-lg" aria-hidden="true">
          ⚠
        </span>
        <div>
          <p className="text-sm font-medium text-red-800 dark:text-red-300">
            {message}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 transition hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 print:hidden"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
