import { Activity } from 'lucide-react'
import type { FindingsPanelHeaderProps } from './FindingsPanelHeaderProps'
import { FindingsToolbar } from './FindingsToolbar'

/** Title of the findings panel, with the filter controls beside it. */
export function FindingsPanelHeader({
  domain,
  filter,
}: Readonly<FindingsPanelHeaderProps>) {
  return (
    <header className="border-border flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="text-primary mt-0.5 shrink-0 [&_svg]:h-5 [&_svg]:w-5">
          <Activity aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-foreground text-base font-semibold">
            Diagnostics findings
          </h2>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Key issues and recommendations for{' '}
            <span className="font-mono break-all">{domain}</span>
          </p>
        </div>
      </div>
      <FindingsToolbar filter={filter} />
    </header>
  )
}
