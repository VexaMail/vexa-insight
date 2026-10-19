import { getLastReportDays } from '@/services/gaps'

/** The last UTC day with report data for one domain, as the list reads it. */
export async function loadLastReportDay(
  domainId: number,
): Promise<number | null> {
  const rows = await getLastReportDays()
  return rows.find((row) => row.domainId === domainId)?.lastReportDay ?? null
}
