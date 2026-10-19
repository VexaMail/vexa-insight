import type {
  DiagnosticsAdminGuide,
  DiagnosticsFinding,
  DnsDiagnostics,
  DomainScore,
} from '@/types/diagnostics'
import type { ReactNode } from 'react'

export type DiagnosticsViewProps = {
  domains: { id: number; name: string }[]
  /** Database id of the domain, for the SPF lookup planner. */
  domainId: number
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
  /** Date-range query string kept across tab links, without `tab`. */
  query: string
  /** The runbook and optional AI analysis, rendered in the Runbook tab. */
  runbook?: ReactNode
}
