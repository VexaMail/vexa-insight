import type { MtaStsResult } from '@/types/diagnostics'

export function emptyMtaStsResult(): MtaStsResult {
  return {
    raw: null,
    valid: false,
    policyFileAccessible: false,
    policyHost: null,
    mode: null,
    fileAge: null,
    mxRecords: [],
  }
}
