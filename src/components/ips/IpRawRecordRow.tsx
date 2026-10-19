import type { IpRawRecordRowProps } from '@/types/ip-detail'
import { IpRawAuthCells } from './IpRawAuthCells'
import { IpRawReportCell } from './IpRawReportCell'
import { IpRawResult } from './IpRawResult'

/** One parsed record: where it came from and what it says, unchanged. */
export function IpRawRecordRow({ record }: Readonly<IpRawRecordRowProps>) {
  return (
    <tr className="align-top [&>td]:px-3 [&>td]:py-2.5">
      <IpRawReportCell record={record} />
      <td className="text-foreground text-right tabular-nums">
        {record.count.toLocaleString('en-US')}
      </td>
      <td className="text-foreground">{record.headerFrom || '-'}</td>
      <td className="text-foreground">{record.envelopeFrom || '-'}</td>
      <IpRawAuthCells record={record} />
      <td>
        <IpRawResult label="dkim" result={record.policyDkim} />
        <IpRawResult label="spf" result={record.policySpf} />
      </td>
      <td
        className={
          record.disposition === 'none' || record.disposition === 'pass'
            ? 'text-foreground'
            : 'text-danger'
        }
      >
        {record.disposition}
      </td>
    </tr>
  )
}
