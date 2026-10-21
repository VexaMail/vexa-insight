'use client'

import { PublicCheckForm } from './PublicCheckForm'
import { PublicReport } from './PublicReport'
import { usePublicCheck } from './hooks/usePublicCheck'

export function PublicDomainChecker() {
  const { report, error, pending, submit } = usePublicCheck()
  return (
    <div id="check" className="mt-10">
      <PublicCheckForm pending={pending} submit={submit} />
      <div
        role="status"
        aria-live="polite"
        className="text-muted-foreground mt-4 text-center text-sm"
      >
        {pending
          ? 'Looking up SPF, DKIM, DMARC and MX records. This may take a few seconds.'
          : null}
      </div>
      {error ? (
        <p
          role="alert"
          className="text-danger mx-auto mt-3 max-w-2xl rounded-md border p-4 text-sm"
        >
          {error}
        </p>
      ) : null}
      {report ? <PublicReport report={report} /> : null}
    </div>
  )
}
