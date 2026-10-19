import { CopyIconButton } from '@/components/ui'
import { CheckedAtNote } from './CheckedAtNote'
import { DiagnosticsHeaderControls } from './DiagnosticsHeaderControls'
import type { DiagnosticsHeaderProps } from './DiagnosticsHeaderProps'
import { RerunDiagnosticsButton } from './RerunDiagnosticsButton'

/** Title, re-run and time of the run, then the domain and window controls. */
export function DiagnosticsHeader({
  checkedAt,
  ...controls
}: Readonly<DiagnosticsHeaderProps>) {
  const domain = controls.currentDomainName
  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <h1 className="text-foreground min-w-0 text-2xl font-semibold tracking-tight sm:text-3xl">
              Diagnostics — <span className="break-all">{domain}</span>
            </h1>
            <CopyIconButton value={domain} label="domain" />
          </div>
          <p className="text-muted-foreground text-sm">
            Analysis of DNS configuration, authentication setup and
            deliverability.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RerunDiagnosticsButton />
          <CheckedAtNote checkedAt={checkedAt} />
        </div>
      </div>
      <DiagnosticsHeaderControls {...controls} />
    </header>
  )
}
