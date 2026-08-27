import type {
  DiagnosticStats,
  DiagnosticsAdminGuide,
  DnsDiagnostics,
  DomainScore,
} from '@/types/diagnostics'
import { createDnsAdminGuides } from './createDnsAdminGuides'
import { createTrafficAdminGuides } from './createTrafficAdminGuides'

export function buildDiagnosticsAdminGuides(
  dns: DnsDiagnostics,
  stats: DiagnosticStats,
  score: DomainScore,
): DiagnosticsAdminGuide[] {
  const guides = [
    ...createDnsAdminGuides(dns),
    ...createTrafficAdminGuides(stats),
  ]

  if (score.grade === 'D' || score.grade === 'F') {
    guides.unshift({
      id: 'low-overall-score',
      severity: 'critical',
      title: 'The overall domain posture is weak',
      summary: `The current score is ${String(score.percentage)}% (${score.grade}) and combines outbound authentication gaps with incomplete inbound protections.`,
      whyItMatters:
        'When the score falls this low, there is usually more than one compounding issue: weak enforcement, incomplete DNS, or telemetry that already shows real failures.',
      howToFix:
        'Prioritize failures that break legitimate authentication first: invalid SPF, missing DKIM, or incorrect DMARC. Then tighten the policy (`p=quarantine/reject`) and add MTA-STS, TLS-RPT, and BIMI.',
      verifySteps: [
        'Fix the `critical` and `high` findings first.',
        'Recalculate the report and confirm the score rises while historical failures drop.',
      ],
    })
  }

  const sortedGuides = guides.toSorted((left, right) => {
    const severityRank = (severity: DiagnosticsAdminGuide['severity']) => {
      if (severity === 'critical') return 0
      if (severity === 'high') return 1
      if (severity === 'medium') return 2
      return 3
    }

    return severityRank(left.severity) - severityRank(right.severity)
  })

  return sortedGuides.slice(0, 6)
}
