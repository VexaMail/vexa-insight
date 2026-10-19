import { FindingsTab } from '../findings/FindingsTab'
import { RecordGeneratorTab } from '../generator/RecordGeneratorTab'
import { AuthTab } from './AuthTab'
import { DiagnosticsTabPanel } from './DiagnosticsTabPanel'
import type { DiagnosticsTabPanelsProps } from './DiagnosticsTabPanelsProps'
import { DnsTab } from './DnsTab'
import { RunbookTab } from './RunbookTab'
import { TransportTab } from './TransportTab'

export function DiagnosticsTabPanels({
  dns,
  score,
  findings,
  guides,
  runbook,
  domainId,
  checkedAt,
  base,
}: Readonly<DiagnosticsTabPanelsProps>) {
  return (
    <>
      <DiagnosticsTabPanel tab="findings" label="Findings">
        <FindingsTab findings={findings} guides={guides} base={base} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel tab="dns" label="DNS records">
        <DnsTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel tab="auth" label="Authentication flow">
        <AuthTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel tab="transport" label="TLS and reporting">
        <TransportTab dns={dns} />
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel tab="runbook" label="Runbook">
        <RunbookTab score={score}>{runbook}</RunbookTab>
      </DiagnosticsTabPanel>
      <DiagnosticsTabPanel
        tab="generator"
        label="Record generator"
        printable={false}
      >
        <RecordGeneratorTab
          dns={dns}
          checkedAt={checkedAt}
          domainId={domainId}
        />
      </DiagnosticsTabPanel>
    </>
  )
}
