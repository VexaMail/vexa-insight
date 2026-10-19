'use client'

import { Button } from '@/components/ui'
import { useDiagnosticsRerun } from '@/hooks/diagnostics'
import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'

/** Runs the DNS checks again by re-rendering the page on the server. */
export function RerunDiagnosticsButton() {
  const { isPending, rerun } = useDiagnosticsRerun()
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={rerun}
      disabled={isPending}
      aria-live="polite"
      className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary h-9 gap-2 print:hidden"
    >
      <RefreshCw
        aria-hidden
        className={cn('h-4 w-4', isPending && 'animate-spin')}
      />
      {isPending ? 'Re-running diagnostics…' : 'Re-run diagnostics'}
    </Button>
  )
}
