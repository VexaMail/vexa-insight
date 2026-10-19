import { domains, normalizedEvents, rawReports } from '@/lib/db'
import { dkimDomainsSql } from './dkimDomainsSql'

/** Projection of one event of the IP timeline. */
export const ipLogSelection = {
  eventId: normalizedEvents.id,
  headerFrom: domains.name,
  disposition: normalizedEvents.disposition,
  spfResult: normalizedEvents.spfResult,
  dkimResult: normalizedEvents.dkimResult,
  spfAuthResult: normalizedEvents.spfAuthResult,
  dkimPassDomains: dkimDomainsSql(true),
  dkimFailDomains: dkimDomainsSql(false),
  count: normalizedEvents.count,
  reportId: rawReports.reportId,
  reportDbId: rawReports.id,
  orgName: rawReports.orgName,
  observedAt: normalizedEvents.reportBeginDate,
}
