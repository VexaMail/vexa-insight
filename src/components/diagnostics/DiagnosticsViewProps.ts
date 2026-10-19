import type {
  DiagnosticsAdminGuide,
  DiagnosticsFinding,
  DiagnosticsTabKey,
  DnsDiagnostics,
  DomainScore,
} from '@/types/diagnostics'
import type { ReactNode } from 'react'

export type DiagnosticsViewProps = {
  domains: { id: number; name: string }[]
  currentDomainName: string
  days: number
  fromDate?: Date | undefined
  toDate?: Date | undefined
  dns: DnsDiagnostics
  score: DomainScore
  findings: readonly DiagnosticsFinding[]
  guides: readonly DiagnosticsAdminGuide[]
  /** ISO timestamp of the live DNS run. */
  checkedAt: string
  activeTab: DiagnosticsTabKey
  /** Date-range query string kept across tab links, without `tab`. */
  query: string
  /** The runbook and optional AI analysis, rendered in the Runbook tab. */
  runbook?: ReactNode
}
