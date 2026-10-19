import type { IpRawRecordRowProps } from '@/types/ip-detail'
import { formatRelativeDate } from '@/utils/format'
import Link from 'next/link'

/** The report a raw record came from: reporter, id and window start. */
export function IpRawReportCell({ record }: Readonly<IpRawRecordRowProps>) {
  return (
    <td className="max-w-[220px]">
      <Link
        href={`/reports/${String(record.reportDbId)}`}
        className="text-foreground hover:text-primary block truncate font-sans font-medium"
      >
        {record.orgName}
      </Link>
      <span
        className="text-muted-foreground block truncate"
        title={record.reportId}
      >
        {record.reportId}
      </span>
      <span className="text-muted-foreground block font-sans">
        {formatRelativeDate(record.beginDate).absolute}
      </span>
    </td>
  )
}
