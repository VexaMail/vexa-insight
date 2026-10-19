'use client'

import { useDiagnosticsRerun } from '@/hooks/diagnostics'
import { cn } from '@/lib/utils'
import { Play, RefreshCw } from 'lucide-react'
import type { RerunDiagnosticsButtonProps } from './RerunDiagnosticsButtonProps'
import { RunDiagnosticsMenu } from './RunDiagnosticsMenu'

/** Runs the DNS checks again; the menu half leads to related views. */
export function RerunDiagnosticsButton({
  base,
}: Readonly<RerunDiagnosticsButtonProps>) {
  const { isPending, rerun } = useDiagnosticsRerun()
  const Icon = isPending ? RefreshCw : Play
  return (
    <div className="bg-primary text-primary-foreground inline-flex h-10 items-stretch overflow-hidden rounded-md shadow-sm print:hidden">
      <button
        type="button"
        onClick={rerun}
        disabled={isPending}
        aria-live="polite"
        className="hover:bg-foreground/10 focus-visible:ring-ring inline-flex cursor-pointer items-center gap-2 px-4 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-80"
      >
        <Icon
          aria-hidden
          className={cn('h-4 w-4', isPending && 'animate-spin')}
        />
        {isPending ? 'Running diagnostics…' : 'Run diagnostics'}
      </button>
      <RunDiagnosticsMenu base={base} />
    </div>
  )
}
