import type { StatusTone } from '@/types/ui'

/** Tone of a raw SPF or DKIM result: pass, soft failure, failure or nothing. */
export function authResultTone(result: string): StatusTone {
  const value = result.toLowerCase()
  if (value === 'pass') return 'success'
  if (value === 'softfail' || value === 'temperror' || value === 'neutral') {
    return 'warning'
  }
  if (value === 'fail' || value === 'permerror') return 'danger'
  return 'unknown'
}
