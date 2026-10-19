'use client'

import { useDnsCheckNow } from '@/hooks/domains'
import type { DnsCheckNowButtonProps } from '@/types/domains'
import { RefreshCw } from 'lucide-react'

/** Re-runs the DNS lookup now instead of waiting for the daily snapshot. */
export function DnsCheckNowButton({
  domainId,
}: Readonly<DnsCheckNowButtonProps>) {
  const { checking, message, checkNow } = useDnsCheckNow(domainId)
  return (
    <div className="flex items-center gap-2">
      {message ? (
        <span className="text-muted-foreground text-xs" role="status">
          {message}
        </span>
      ) : null}
      <button
        type="button"
        onClick={checkNow}
        disabled={checking}
        className="border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-60"
      >
        <RefreshCw
          className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`}
          aria-hidden
        />
        {checking ? 'Checking' : 'Check now'}
      </button>
    </div>
  )
}
