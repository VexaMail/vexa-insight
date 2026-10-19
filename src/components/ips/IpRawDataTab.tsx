import { EmptyState, InlineErrorBlock, Panel } from '@/components/ui'
import type { IpRawDataTabProps } from '@/types/ip-detail'
import { Table2 } from 'lucide-react'
import { IpRawJsonPanel } from './IpRawJsonPanel'
import { IpRawRecordRow } from './IpRawRecordRow'

/**
 * The source's aggregate report records exactly as the reports wrote them:
 * identifiers, every DKIM and SPF result, and the evaluated policy.
 */
export function IpRawDataTab({ records }: Readonly<IpRawDataTabProps>) {
  if (!records) {
    return (
      <InlineErrorBlock>
        The raw report records are temporarily unavailable.
      </InlineErrorBlock>
    )
  }
  if (records.length === 0) {
    return (
      <EmptyState>
        No aggregate report in the window lists this address.
      </EmptyState>
    )
  }
  return (
    <div className="space-y-4">
      <Panel
        flush
        icon={<Table2 />}
        title="Report records"
        description={`${records.length.toLocaleString()} ${records.length === 1 ? 'record' : 'records'} from the latest reports, read from the stored XML`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left font-mono text-xs">
            <thead className="text-muted-foreground border-border border-b font-sans">
              <tr className="[&>th]:px-3 [&>th]:py-2.5 [&>th]:font-medium">
                <th>Report</th>
                <th className="text-right">Count</th>
                <th>header_from</th>
                <th>envelope_from</th>
                <th>DKIM d= / s=</th>
                <th>SPF domain</th>
                <th>Policy DKIM / SPF</th>
                <th>Disposition</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {records.map((record) => (
                <IpRawRecordRow key={record.key} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <IpRawJsonPanel records={records} />
    </div>
  )
}
