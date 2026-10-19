import type { StatusTone } from '@/types/ui'

/** The pill tone of a domain status filter value. */
export function domainHealthTone(health: string): StatusTone {
  if (health === 'Active') return 'success'
  if (health === 'Warning') return 'warning'
  if (health === 'Critical') return 'danger'
  return 'unknown'
}
