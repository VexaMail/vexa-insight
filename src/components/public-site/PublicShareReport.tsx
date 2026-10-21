'use client'

import type { PublicDomainInputProps } from '../../types/public-check/PublicDomainInputProps'
import { usePublicReportShare } from './hooks/usePublicReportShare'

export function PublicShareReport({
  domain,
}: Readonly<PublicDomainInputProps>) {
  const { url, feedback, copy } = usePublicReportShare(domain)
  return (
    <div>
      <button
        type="button"
        className="hover:bg-accent focus-visible:ring-ring min-h-11 rounded-md border px-4 py-2 text-sm font-medium focus-visible:ring-2"
        onClick={() => {
          void copy()
        }}
      >
        Copy report link
      </button>
      <p role="status" className="text-muted-foreground text-xs">
        {feedback}
      </p>
      {feedback === 'Copy the report link below' ? (
        <input
          aria-label="Report link"
          readOnly
          value={url}
          className="bg-background mt-2 w-full rounded border p-2 text-base"
          onFocus={(event) => {
            event.currentTarget.select()
          }}
        />
      ) : null}
    </div>
  )
}
