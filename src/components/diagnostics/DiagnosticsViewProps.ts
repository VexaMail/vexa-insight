import type { DnsDiagnostics, DomainScore } from '@/types/diagnostics'

export type DiagnosticsViewProps = {
  domains: { id: number; name: string }[]
  currentDomainName: string
  days: number
  fromDate?: Date | undefined
  toDate?: Date | undefined
  dns: DnsDiagnostics
  score: DomainScore
}
