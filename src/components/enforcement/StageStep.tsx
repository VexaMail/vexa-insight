import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { StageStepProps } from './StageStepProps'

/** One step of the enforcement guide. */
export function StageStep({ stage, index }: Readonly<StageStepProps>) {
  const isCurrent = stage.state === 'current'
  return (
    <li
      aria-current={isCurrent ? 'step' : undefined}
      className={cn(
        'flex min-w-0 flex-1 gap-3 rounded-md border p-3 transition-colors duration-150',
        isCurrent ? 'border-primary/50 bg-primary/10' : 'border-border',
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold',
          stage.state === 'done' &&
            'border-success/40 bg-success/10 text-success',
          isCurrent && 'border-primary bg-primary text-primary-foreground',
          stage.state === 'todo' && 'border-border text-muted-foreground',
        )}
      >
        {stage.state === 'done' ? (
          <Check className="h-3.5 w-3.5" aria-label="done" />
        ) : (
          index + 1
        )}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block text-sm font-semibold',
            stage.state === 'todo'
              ? 'text-muted-foreground'
              : 'text-foreground',
          )}
        >
          {stage.label}
          {isCurrent ? (
            <span className="text-primary ml-2 text-xs font-medium">
              Next step
            </span>
          ) : null}
        </span>
        <span className="text-muted-foreground block text-xs">
          {stage.hint}
        </span>
      </span>
    </li>
  )
}
