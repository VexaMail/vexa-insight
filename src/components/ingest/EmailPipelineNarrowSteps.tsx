'use client'

import type { EmailPipelineStepsProps } from '@/types/ingest'
import { getMobileStepColorClasses, getStepBadgeClasses } from '@/utils/ingest'
import StepIcon from './StepIcon'

/** Vertical pipeline shown below the md breakpoint. */
export function EmailPipelineNarrowSteps({ steps }: EmailPipelineStepsProps) {
  return (
    <div className="mt-4 space-y-0 md:hidden">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex items-start gap-3">
          <div className="relative flex flex-col items-center">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full ring-1 ${getMobileStepColorClasses(step.status)}`}
              aria-label={`${step.label}: ${step.status}`}
            >
              <StepIcon status={step.status} />
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`mt-1 h-5 w-0.5 rounded ${
                  step.status === 'done' ? 'bg-success/30' : 'bg-border'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-foreground truncate text-sm font-semibold">
                {step.label}
              </span>
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${getStepBadgeClasses(step.status)}`}
              >
                {step.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
