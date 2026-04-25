export type DiagnosticsAdminGuide = {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  summary: string
  whyItMatters: string
  howToFix: string
  verifySteps: string[]
}
