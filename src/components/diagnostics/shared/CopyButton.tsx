'use client'

import { useCopyButton } from '@/hooks/diagnostics'
import { Check, Copy } from 'lucide-react'
import type { CopyButtonProps } from './CopyButtonProps'

export function CopyButton({ text }: Readonly<CopyButtonProps>) {
  const { copied, handleCopy } = useCopyButton(text)

  return (
    <button
      type="button"
      onClick={() => {
        void handleCopy()
      }}
      className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors print:hidden"
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-500">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
