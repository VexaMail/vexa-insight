'use client'

import type { EmailPipelineStepsProps } from '@/types/ingest'
import { getStepBadgeClasses } from '@/utils/ingest'
import StepIcon from './StepIcon'

/** Expanded per-step execution list. */
export function EmailPipelineDetails({ steps }: EmailPipelineStepsProps) {
  return (
    <div className="border-border/50 bg-surface-1 mt-3 rounded-lg border p-3">
      <div className="text-foreground text-xs font-semibold">
        Execution details
      </div>
      <div className="mt-2 space-y-1.5">
        {steps.map((step) => (
          <div
            key={step.key}
            className="border-border/30 bg-card flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <StepIcon status={step.status} />
              <span className="text-foreground truncate text-xs font-medium">
                {step.label}
              </span>
            </div>
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${getStepBadgeClasses(step.status)}`}
            >
              {step.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
