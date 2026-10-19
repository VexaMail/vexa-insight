'use client'

import { SOURCE_VERDICT_OPTIONS } from '@/constants/ips'
import { useSourceReview } from '@/hooks/ips'
import type { SourceReviewRowProps } from '@/types/ips'
import Link from 'next/link'
import { SourceVerdictButton } from './SourceVerdictButton'

/** The verdict buttons for one domain this source sends for. */
export function SourceReviewRow({
  ip,
  domain,
  messageCount,
  initialVerdict,
}: Readonly<SourceReviewRowProps>) {
  const { verdict, saving, error, setVerdict } = useSourceReview(
    ip,
    domain,
    initialVerdict,
  )
  return (
    <li className="flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <Link
          href={`/domains/${encodeURIComponent(domain)}`}
          className="text-foreground text-sm font-medium hover:underline"
        >
          {domain}
        </Link>
        <p className="text-muted-foreground text-xs">
          {messageCount.toLocaleString('en-US')}{' '}
          {messageCount === 1 ? 'message' : 'messages'}
          {error ? <span className="text-danger"> · {error}</span> : null}
        </p>
      </div>
      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label={`Verdict for ${domain}`}
      >
        {SOURCE_VERDICT_OPTIONS.map((option) => (
          <SourceVerdictButton
            key={option.verdict}
            option={option}
            active={verdict === option.verdict}
            disabled={saving}
            onToggle={() => {
              setVerdict(verdict === option.verdict ? null : option.verdict)
            }}
          />
        ))}
      </div>
    </li>
  )
}
