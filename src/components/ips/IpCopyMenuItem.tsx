'use client'

import { useCopyButton } from '@/hooks/ui'
import type { IpCopyMenuItemProps } from '@/types/ips'
import { Check, Copy } from 'lucide-react'

/** A menu entry that copies one value and says so. */
export function IpCopyMenuItem({
  label,
  value,
}: Readonly<IpCopyMenuItemProps>) {
  const { copied, handleCopy } = useCopyButton(value)
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          void handleCopy()
        }}
        className="text-foreground hover:bg-accent focus-visible:bg-accent flex min-h-10 w-full items-center gap-2.5 rounded-md px-2.5 text-left text-sm transition-colors duration-150 focus-visible:outline-none"
      >
        {copied ? (
          <Check className="text-success h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <Copy
            className="text-muted-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
        )}
        <span aria-live="polite">
          {copied ? `Copied ${label}` : `Copy ${label}`}
        </span>
      </button>
    </li>
  )
}
