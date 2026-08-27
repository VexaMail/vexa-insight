export type DiagnosticsAdminGuideSummary = {
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  summary: string
  howToFix: string
  verifySteps: string[]
}
