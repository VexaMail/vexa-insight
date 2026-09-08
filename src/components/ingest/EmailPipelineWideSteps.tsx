'use client'

import type { EmailPipelineStepsProps } from '@/types/ingest'
import { getStepColorClasses, STATUS_LABEL } from '@/utils/ingest'
import StepIcon from './StepIcon'

/** Horizontal pipeline shown from the md breakpoint upwards. */
export function EmailPipelineWideSteps({ steps }: EmailPipelineStepsProps) {
  return (
    <div className="mt-4 hidden md:block">
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => (
          <div key={step.key} className="flex min-w-0 flex-1 items-center">
            <div
              className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2 transition-all ${getStepColorClasses(step.status)}`}
              title={`${step.label}: ${step.status}`}
              aria-label={`${step.label}: ${step.status}`}
            >
              <span
                className={`shrink-0 ${step.status === 'active' ? 'animate-pulse' : ''}`}
              >
                <StepIcon status={step.status} />
              </span>
              <div className="min-w-0">
                <div className="text-foreground truncate text-xs font-semibold">
                  {step.label}
                </div>
                <div className="text-muted-foreground truncate text-[10px]">
                  {STATUS_LABEL[step.status] ?? 'Waiting'}
                </div>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 w-3 shrink-0 ${
                  step.status === 'done' ? 'bg-success/40' : 'bg-border'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
