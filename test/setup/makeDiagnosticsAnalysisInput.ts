import type { DiagnosticsAnalysisInput } from '@/services/ai'
import { makeDiagnosticsDnsSummary } from './makeDiagnosticsDnsSummary'

/** Prompt input with every optional section present. */
export function makeDiagnosticsAnalysisInput(): DiagnosticsAnalysisInput {
  return {
    domainName: 'example.com',
    score: { grade: 'C', percentage: 61 },
    dns: makeDiagnosticsDnsSummary(),
    stats: {
      totalMessages: 400,
      failedMessages: 25,
      passRate: 94,
      spfAuthFailCount: 10,
      spfPermerrorCount: 2,
      spfTemperrorCount: 1,
      spfSoftfailCount: 4,
      spfPassUnalignedCount: 3,
      dkimAllFailCount: 8,
      dkimPassUnalignedCount: 5,
      dmarcOverrideForwarded: 6,
      dmarcOverrideLocalPolicy: 1,
    },
    reportAggregate: {
      reportCount: 7,
      orgCount: 3,
      totalMessages: 200,
      spfPassCount: 150,
      dkimPassCount: 190,
      spfAlignedCount: 149,
      dkimAlignedCount: 190,
      dispositionBreakdown: { none: 195, quarantine: 5 },
      topOrgs: [{ orgName: 'google.com', messageCount: 120 }],
      forwardedOverrideCount: 4,
      dateRange: { start: '2026-06-01', end: '2026-06-30' },
    },
    adminGuides: [
      {
        severity: 'high',
        title: 'SPF needs correction',
        summary: 'The SPF record exceeds the lookup limit.',
        howToFix: 'Reduce include mechanisms.',
        verifySteps: ['dig TXT example.com +short', 'Recheck the report.'],
      },
    ],
  }
}
