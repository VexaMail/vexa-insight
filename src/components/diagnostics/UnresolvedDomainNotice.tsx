import { AlertTriangle } from 'lucide-react'
import type { UnresolvedDomainNoticeProps } from './UnresolvedDomainNoticeProps'

/** Shown when the NS lookup came back empty, so "missing" may mean "no answer". */
export function UnresolvedDomainNotice({
  domain,
}: Readonly<UnresolvedDomainNoticeProps>) {
  return (
    <div
      role="status"
      className="border-warning/35 bg-warning/10 text-foreground flex items-start gap-2 rounded-lg border p-3 text-sm"
    >
      <AlertTriangle
        aria-hidden
        className="text-warning mt-0.5 h-4 w-4 shrink-0"
      />
      <p>
        No NS records came back for <span className="font-mono">{domain}</span>.
        Either the domain does not resolve or the lookups timed out, so a record
        shown as missing below may simply not have answered. Re-run the checks
        to confirm.
      </p>
    </div>
  )
}
