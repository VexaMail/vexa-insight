import type { BuildIpDetailContextParams, IpDetailContext } from '@/types/ips'
import { buildIpAuthChecks } from './buildIpAuthChecks'
import { buildIpDetailTabs } from './buildIpDetailTabs'
import { buildIpEventFilterLinks } from './buildIpEventFilterLinks'
import { buildIpTrendSeries } from './buildIpTrendSeries'
import { classifySourceCause } from './classifySourceCause'
import { parseIpEventFilter } from './parseIpEventFilter'

/** Derives the cause, the five checks, the trends and the page's links. */
export function buildIpDetailContext({
  basePath,
  searchParams,
  daily,
  ...loaded
}: BuildIpDetailContextParams): IpDetailContext {
  return {
    ...loaded,
    cause: classifySourceCause(loaded.data),
    checks: buildIpAuthChecks(loaded.data, loaded.dkimSignatures),
    trend: buildIpTrendSeries(daily, loaded.dateRange),
    tabs: buildIpDetailTabs(basePath, searchParams),
    eventFilter: parseIpEventFilter(searchParams['events']),
    eventFilterLinks: buildIpEventFilterLinks(basePath, searchParams),
  }
}
