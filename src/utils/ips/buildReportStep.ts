import type { IpLogRow } from '@/types/IpLogRow'
import type { IpEventStepData } from '@/types/ips'

/** The last stage of an event: the aggregate report that published it. */
export function buildReportStep(row: IpLogRow): IpEventStepData {
  return {
    kind: 'report',
    title: `Reported by ${row.orgName}`,
    tone: 'info',
    verdict: null,
    lines: [`Report ID ${row.reportId}`],
    href: `/reports/${String(row.reportDbId)}`,
  }
}
