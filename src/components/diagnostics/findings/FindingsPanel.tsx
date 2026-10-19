'use client'

import { Panel } from '@/components/ui'
import { useFindingsFilter } from '@/hooks/diagnostics'
import { FindingCards } from './FindingCards'
import type { FindingsListProps } from './FindingsListProps'
import { FindingsPanelHeader } from './FindingsPanelHeader'
import { FindingsTable } from './FindingsTable'

/** Every check of the run, filtered on the client by severity and text. */
export function FindingsPanel({ findings, base }: Readonly<FindingsListProps>) {
  const filter = useFindingsFilter(findings)
  return (
    <Panel flush>
      <FindingsPanelHeader domain={base.domain} filter={filter} />
      {filter.visible.length === 0 ? (
        <p className="text-muted-foreground px-4 py-6 text-sm">
          No findings match this filter.
        </p>
      ) : (
        <>
          <FindingsTable findings={filter.visible} base={base} />
          <FindingCards findings={filter.visible} base={base} />
        </>
      )}
    </Panel>
  )
}
