import { ALLOWED } from './allowed'
import { DEFAULT } from './default'

/**
 * Returns the given value if it is an allowed page size for poll-status (50, 100, 300, 500, 1000); otherwise 50.
 */
export function pollStatusPageSize(value: number): number {
  return ALLOWED.includes(value as (typeof ALLOWED)[number]) ? value : DEFAULT
}
