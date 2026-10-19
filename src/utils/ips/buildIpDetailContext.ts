import type { BuildIpDetailContextParams, IpDetailContext } from '@/types/ips'
import { buildIpAuthChecks } from './buildIpAuthChecks'
import { buildIpDetailTabs } from './buildIpDetailTabs'
import { classifySourceCause } from './classifySourceCause'

/** Derives the cause, the five checks and the tab links of a source page. */
export function buildIpDetailContext({
  basePath,
  searchParams,
  ...loaded
}: BuildIpDetailContextParams): IpDetailContext {
  return {
    ...loaded,
    cause: classifySourceCause(loaded.data),
    checks: buildIpAuthChecks(loaded.data, loaded.dkimSignatures),
    tabs: buildIpDetailTabs(basePath, searchParams),
  }
}
