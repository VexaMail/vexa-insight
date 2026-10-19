import type { BuildIpDetailContextParams, IpDetailContext } from '@/types/ips'
import { buildIpAuthChecks } from './buildIpAuthChecks'
import { buildIpDetailTabs } from './buildIpDetailTabs'
import { buildIpTrendSeries } from './buildIpTrendSeries'
import { classifySourceCause } from './classifySourceCause'

/** Derives the cause, the five checks, the trends and the tab links. */
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
  }
}
