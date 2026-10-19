import { SOURCE_CAUSE_ORDER } from '@/constants/ips'
import type { SearchParamsRecord, SourceCause } from '@/types/ips'
import { withSearchParam } from './withSearchParam'

/** Link of every cause filter, plus `all`, keeping the date range. */
export function buildSourceCauseHrefs(
  searchParams: SearchParamsRecord,
): Record<SourceCause | 'all', string> {
  const hrefs = {
    all: withSearchParam('/ips', searchParams, 'cause', null),
  } as Record<SourceCause | 'all', string>
  for (const cause of SOURCE_CAUSE_ORDER) {
    hrefs[cause] = withSearchParam('/ips', searchParams, 'cause', cause)
  }
  return hrefs
}
