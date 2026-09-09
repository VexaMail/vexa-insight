import type { MtaStsPolicyFields } from '@/types/diagnostics'

/**
 * Reads mode, max_age and the mx lines out of an MTA-STS policy body.
 */
export function parseMtaStsPolicyText(policyText: string): MtaStsPolicyFields {
  const modeMatch = /mode:\s*(\S+)/.exec(policyText)
  const ageMatch = /max_age:\s*(\d+)/.exec(policyText)
  const mxRecords: string[] = []
  for (const m of policyText.matchAll(/mx:\s*(\S+)/g)) {
    if (m[1]) mxRecords.push(m[1])
  }
  return {
    mode: modeMatch?.[1] ?? null,
    fileAge: ageMatch?.[1] ?? null,
    mxRecords,
  }
}
