'use client'

import { useCopyButton } from '@/hooks/ui'
import { Check, Copy } from 'lucide-react'
import type { CopyButtonProps } from './CopyButtonProps'

export function CopyButton({
  text,
  label = 'Copy',
}: Readonly<CopyButtonProps>) {
  const { copied, handleCopy } = useCopyButton(text)

  return (
    <button
      type="button"
      onClick={() => {
        void handleCopy()
      }}
      className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs whitespace-nowrap transition-colors print:hidden"
      aria-label={copied ? 'Copied' : `${label} to clipboard`}
    >
      {copied ? (
        <>
          <Check className="text-success h-3.5 w-3.5" />
          <span className="text-success">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}
