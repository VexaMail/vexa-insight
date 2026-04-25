'use client'

import type { ProgressItemStepsBarProps } from '@/types/ingest'
import { countDoneSteps } from '@/utils/dashboard'
import { getStatusClassName } from './getStatusClassName'

export default function ProgressItemStepsBar({
  steps,
}: Readonly<ProgressItemStepsBarProps>) {
  if (steps.length === 0) return null

  const valueNow = countDoneSteps(steps)

  return (
    <div
      role="progressbar"
      aria-valuenow={valueNow}
      aria-valuemin={0}
      aria-valuemax={steps.length}
      aria-label={`Progress: ${valueNow} of ${steps.length} steps completed`}
      className="flex w-full gap-0.5 overflow-hidden rounded-md"
    >
      {steps.map((step) => (
        <span
          key={step.key}
          title={step.label}
          aria-label={`${step.label}: ${step.status}`}
          data-status={step.status}
          className={`min-w-0 flex-1 rounded-sm transition-colors ${getStatusClassName(step.status)}`}
          style={{ minHeight: 6 }}
        />
      ))}
    </div>
  )
}
