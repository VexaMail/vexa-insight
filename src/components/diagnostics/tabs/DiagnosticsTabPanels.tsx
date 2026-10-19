import { FindingsTab } from '../findings/FindingsTab'
import { AuthTab } from './AuthTab'
import { DiagnosticsTabPanel } from './DiagnosticsTabPanel'
import type { DiagnosticsTabPanelsProps } from './DiagnosticsTabPanelsProps'
import { DnsTab } from './DnsTab'
import { RunbookTab } from './RunbookTab'
import { TransportTab } from './TransportTab'

export function DiagnosticsTabPanels({
  activeTab,
  dns,
  score,
  findings,
  guides,
  runbook,
  base,
}: Readonly<DiagnosticsTabPanelsProps>) {
  return (
    <>
      <DiagnosticsTabPanel active={activeTab === 'findings'} label="Findings">
        <FindingsTab findings={findings} guides={guides} base={base} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel active={activeTab === 'dns'} label="DNS records">
        <DnsTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel
        active={activeTab === 'auth'}
        label="Authentication flow"
      >
        <AuthTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel
        active={activeTab === 'transport'}
        label="TLS and reporting"
      >
        <TransportTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel active={activeTab === 'runbook'} label="Runbook">
        <RunbookTab score={score}>{runbook}</RunbookTab>
      </DiagnosticsTabPanel>
    </>
  )
}
