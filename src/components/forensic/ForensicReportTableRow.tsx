import { formatRelativeDate } from '@/utils/format'
import Link from 'next/link'
import type { ForensicReportRowProps } from './ForensicReportRowProps'

/** One failure report: one identified message. */
export function ForensicReportTableRow({
  row,
}: Readonly<ForensicReportRowProps>) {
  const cell = 'px-3 py-2'
  const dkim = row.dkimDomain
    ? `${row.dkimDomain}${row.dkimSelector ? ` (${row.dkimSelector})` : ''}`
    : '-'
  return (
    <tr>
      <td className={`${cell} text-muted-foreground whitespace-nowrap`}>
        {formatRelativeDate(row.arrivalDate).absolute}
      </td>
      <td className={`${cell} font-mono`}>
        {row.sourceIp ? (
          <Link
            href={`/ips/${encodeURIComponent(row.sourceIp)}`}
            className="text-info hover:text-primary"
          >
            {row.sourceIp}
          </Link>
        ) : (
          '-'
        )}
      </td>
      <td className={`${cell} text-danger font-mono`}>
        {row.authFailure ?? row.dmarcResult ?? '-'}
      </td>
      <td className={cell}>
        {row.headerFromDomain ?? '-'} / {row.envelopeFromDomain ?? '-'}
      </td>
      <td className={`${cell} font-mono`}>{dkim}</td>
      <td className={cell}>{row.listId ?? '-'}</td>
      <td className={cell}>{row.reportingMta ?? '-'}</td>
    </tr>
  )
}
