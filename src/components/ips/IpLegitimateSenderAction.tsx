'use client'

import { useMarkLegitimateSender } from '@/hooks/ips'
import type { IpLegitimateSenderActionProps } from '@/types/ips'
import { Check, Loader2, ShieldCheck } from 'lucide-react'

/** Saves `legitimate` as the operator verdict for the source's one domain. */
export function IpLegitimateSenderAction({
  ip,
  domain,
  initialVerdict,
}: Readonly<IpLegitimateSenderActionProps>) {
  const { listed, saving, error, add } = useMarkLegitimateSender(
    ip,
    domain,
    initialVerdict,
  )
  const Icon = saving ? Loader2 : listed ? Check : ShieldCheck
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
      className="border-success/50 text-success hover:bg-success/10 focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-default disabled:opacity-80"
    >
      <Icon
        className={saving ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
        aria-hidden="true"
      />
      {error
        ? 'Not saved, retry'
        : listed
          ? 'Marked legitimate'
          : 'Mark as legitimate sender'}
    </button>
  )
}
