import { buildDiagnosticsAdminGuides } from '@/services/diagnostics'
import type { DiagnosticsAdminGuideSummary } from '../contracts'

/** The admin guides reduced to what the prompt needs. */
export function summarizeAdminGuides(
  ...args: Parameters<typeof buildDiagnosticsAdminGuides>
): DiagnosticsAdminGuideSummary[] {
  return buildDiagnosticsAdminGuides(...args).map((guide) => ({
    severity: guide.severity,
    title: guide.title,
    summary: guide.summary,
    howToFix: guide.howToFix,
    verifySteps: guide.verifySteps,
  }))
}
