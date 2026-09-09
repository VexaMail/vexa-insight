import type { RunbookHeadingProps } from './RunbookHeadingProps'

export function RunbookHeading({ domainName }: Readonly<RunbookHeadingProps>) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        Admin Runbook
      </p>
      <h3 className="text-foreground text-base font-semibold">
        What to review in {domainName} and how to fix it
      </h3>
      <p className="text-muted-foreground text-sm">
        Operational guidance based on live DNS and historical telemetry so an
        admin can identify the cause and fix it, not just read a summary.
      </p>
    </div>
  )
}
