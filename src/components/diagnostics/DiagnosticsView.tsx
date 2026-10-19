import { TabNav } from '@/components/ui'
import {
  buildDiagnosticsTabItems,
  countActionableFindings,
} from '@/utils/diagnostics'
import { DiagnosticsHeader } from './DiagnosticsHeader'
import type { DiagnosticsViewProps } from './DiagnosticsViewProps'
import { DiagnosticsSummary } from './summary/DiagnosticsSummary'
import { DiagnosticsTabPanels } from './tabs/DiagnosticsTabPanels'
import { UnresolvedDomainNotice } from './UnresolvedDomainNotice'

/**
 * One domain's diagnostics: header, score and protocol tiles, then the tabs.
 * Every tab panel is rendered so the PDF export prints all of them.
 */
export function DiagnosticsView(props: Readonly<DiagnosticsViewProps>) {
  const base = { domain: props.currentDomainName, query: props.query }
  const actionable = countActionableFindings(props.findings)

  return (
    <div className="flex flex-col space-y-6">
      <DiagnosticsHeader {...props} />
      {props.dns.nsRecords.length === 0 ? (
        <UnresolvedDomainNotice domain={props.currentDomainName} />
      ) : null}
      <DiagnosticsSummary
        score={props.score}
        findings={props.findings}
        base={base}
        actionable={actionable}
      />
      <div className="print:hidden">
        <TabNav
          items={buildDiagnosticsTabItems(base, actionable)}
          active={props.activeTab}
          label="Diagnostics sections"
        />
      </div>
      <DiagnosticsTabPanels {...props} base={base} />
    </div>
  )
}
