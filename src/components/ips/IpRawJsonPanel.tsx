import { CopyIconButton, Panel } from '@/components/ui'
import type { IpRawDataTabProps } from '@/types/ip-detail'
import { Braces } from 'lucide-react'

/** The same records as JSON, as the XML parser returned them, to copy. */
export function IpRawJsonPanel({ records }: Readonly<IpRawDataTabProps>) {
  const json = JSON.stringify(
    (records ?? []).map((record) => ({
      report: {
        id: record.reportId,
        org: record.orgName,
        begin: record.beginDate,
      },
      record: record.record,
    })),
    null,
    2,
  )
  return (
    <Panel
      flush
      icon={<Braces />}
      title="Parsed records (JSON)"
      description="Each record element of the reports, field names as in the XML"
      actions={<CopyIconButton value={json} label="records as JSON" />}
    >
      <pre className="text-foreground bg-secondary/40 max-h-[480px] overflow-auto p-4 font-mono text-xs leading-relaxed">
        {json}
      </pre>
    </Panel>
  )
}
