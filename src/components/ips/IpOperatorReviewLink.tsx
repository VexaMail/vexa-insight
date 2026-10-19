'use client'

import { OPERATOR_REVIEW_ANCHOR_ID } from '@/constants/ips'
import { useOperatorReviewJump } from '@/hooks/ips'
import type { IpOperatorReviewLinkProps } from '@/types/ips'
import { ShieldCheck } from 'lucide-react'

/**
 * The header entry to Operator review when the source sends for several
 * domains: the verdict is per domain, so it scrolls to and focuses the panel.
 */
export function IpOperatorReviewLink({
  domainCount,
}: Readonly<IpOperatorReviewLinkProps>) {
  const handleJump = useOperatorReviewJump()
  return (
    <a
      href={`#${OPERATOR_REVIEW_ANCHOR_ID}`}
      onClick={handleJump}
      title="Choose the verdict for each domain in Operator review"
      className="border-success/50 text-success hover:bg-success/10 focus-visible:ring-ring inline-flex min-h-10 items-center gap-2 rounded-md border px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
    >
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      Mark legitimate
      <span className="text-xs font-normal">
        {`· ${String(domainCount)} domains`}
      </span>
    </a>
  )
}
