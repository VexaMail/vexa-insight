import type { IpLegitimateSenderButtonProps } from '@/types/ips'
import { ShieldCheck } from 'lucide-react'
import { IpLegitimateSenderAction } from './IpLegitimateSenderAction'

/**
 * Marks the source as a legitimate sender. With one related domain it saves
 * the verdict at once; with several it leads to the per-domain review.
 */
export function IpLegitimateSenderButton({
  ip,
  domains,
  initialVerdict,
}: Readonly<IpLegitimateSenderButtonProps>) {
  const [only] = domains
  if (domains.length === 1 && only) {
    return (
      <IpLegitimateSenderAction
        ip={ip}
        domain={only}
        initialVerdict={initialVerdict}
      />
    )
  }
  if (domains.length === 0) return null
  return (
    <a
      href="#operator-review"
      title="Record per domain whether this source is a legitimate sender"
      className="border-success/50 text-success hover:bg-success/10 focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      Mark as legitimate sender
    </a>
  )
}
