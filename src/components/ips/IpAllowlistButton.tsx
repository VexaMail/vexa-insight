import type { IpAllowlistButtonProps } from '@/types/ips'
import { Plus } from 'lucide-react'
import { IpAllowlistAction } from './IpAllowlistAction'

/**
 * Marks the source as a legitimate sender. With one related domain it saves
 * the verdict at once; with several it leads to the per-domain review.
 */
export function IpAllowlistButton({
  ip,
  domains,
  initialVerdict,
}: Readonly<IpAllowlistButtonProps>) {
  const [only] = domains
  if (domains.length === 1 && only) {
    return (
      <IpAllowlistAction
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
      title="Choose the domains this source is allowed for"
      className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      Add to allowlist
    </a>
  )
}
