'use client'

import { useCopyButton } from '@/hooks/ui'
import { cn } from '@/lib/utils'
import type { CopyButtonProps } from '@/types/ui'
import { Check, Copy } from 'lucide-react'

/** Icon-only copy control placed next to an IP, a hostname or a record. */
export function CopyIconButton({
  value,
  label,
  className,
}: Readonly<CopyButtonProps>) {
  const { copied, handleCopy } = useCopyButton(value)
  return (
    <button
      type="button"
      onClick={() => {
        void handleCopy()
      }}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className={cn(
        'text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none print:hidden',
        className,
      )}
    >
      {copied ? (
        <Check className="text-success h-3.5 w-3.5" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  )
}
