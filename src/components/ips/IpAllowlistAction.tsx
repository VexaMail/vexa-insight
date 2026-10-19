'use client'

import { useAllowlistSource } from '@/hooks/ips'
import type { IpAllowlistActionProps } from '@/types/ips'
import { Check, Loader2, Plus } from 'lucide-react'

/** Saves `legitimate` as the operator verdict for the source's one domain. */
export function IpAllowlistAction({
  ip,
  domain,
  initialVerdict,
}: Readonly<IpAllowlistActionProps>) {
  const { listed, saving, error, add } = useAllowlistSource(
    ip,
    domain,
    initialVerdict,
  )
  const Icon = saving ? Loader2 : listed ? Check : Plus
  return (
    <button
      type="button"
      onClick={add}
      disabled={saving || listed}
      title={
        error ??
        (listed
          ? `Recorded as a legitimate sender for ${domain}`
          : `Record this source as a legitimate sender for ${domain}`)
      }
      className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-80"
    >
      <Icon
        className={saving ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
        aria-hidden="true"
      />
      {error
        ? 'Not saved, retry'
        : listed
          ? 'On allowlist'
          : 'Add to allowlist'}
    </button>
  )
}
