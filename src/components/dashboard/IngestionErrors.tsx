import { RECENT_ERROR_DAYS } from '@/constants/dashboard'
import { pluralize } from '@/utils/dashboard'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** Errors across recent runs, in the danger tone when there are any. */
export function IngestionErrors({
  health,
}: Readonly<Pick<IngestionFactsProps, 'health'>>) {
  const count = health.recentErrorCount
  return (
    <span className={count > 0 ? 'text-danger' : ''}>
      {count === 0
        ? `No errors in the last ${String(RECENT_ERROR_DAYS)} days`
        : `${pluralize(count, 'error')} in the last ${String(RECENT_ERROR_DAYS)} days`}
    </span>
  )
}
