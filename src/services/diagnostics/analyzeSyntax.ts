import type { SpfCheckResult } from '@/types/diagnostics'

export function analyzeSyntax(
  spf: string,
  allSpfRecords: string[],
): SpfCheckResult[] {
  const checks: SpfCheckResult[] = []

  checks.push({
    name: 'Valid SPF record',
    passed: spf.startsWith('v=spf1'),
    detail: spf.startsWith('v=spf1')
      ? 'Record starts with v=spf1.'
      : 'Record does not start with v=spf1.',
  })

  checks.push({
    name: 'Single SPF record',
    passed: allSpfRecords.length === 1,
    detail:
      allSpfRecords.length === 1
        ? 'Only one SPF record found.'
        : `${String(allSpfRecords.length)} SPF records found. Only one is allowed per domain.`,
  })

  const hasAllMechanism =
    spf.includes(' -all') || spf.includes(' ~all') || spf.includes(' ?all')
  checks.push({
    name: 'Contains "all" mechanism',
    passed: hasAllMechanism,
    detail: hasAllMechanism
      ? 'Record contains an "all" mechanism.'
      : 'No "all" mechanism found. SPF record should end with -all, ~all, or ?all.',
  })

  return checks
}
