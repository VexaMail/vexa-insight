import { CopyIconButton, EntityHeader } from '@/components/ui'
import { CheckedAtNote } from './CheckedAtNote'
import { DiagnosticsBreadcrumb } from './DiagnosticsBreadcrumb'
import { DiagnosticsHeaderControls } from './DiagnosticsHeaderControls'
import type { DiagnosticsHeaderProps } from './DiagnosticsHeaderProps'

/** Breadcrumb, domain, time of the run and the page actions. */
export function DiagnosticsHeader({
  checkedAt,
  ...controls
}: Readonly<DiagnosticsHeaderProps>) {
  const domain = controls.currentDomainName
  return (
    <div className="space-y-3">
      <DiagnosticsBreadcrumb domain={domain} />
      <EntityHeader
        kind="Domain diagnostics"
        title={domain}
        titleAddon={<CopyIconButton value={domain} label="domain" />}
        chips={<CheckedAtNote checkedAt={checkedAt} />}
        actions={<DiagnosticsHeaderControls {...controls} />}
      />
    </div>
  )
}
