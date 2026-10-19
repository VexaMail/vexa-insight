'use client'

import { Panel } from '@/components/ui'
import { useGeneratorFields } from '@/hooks/diagnostics'
import { splitList } from '@/utils/diagnostics'
import { buildTlsRptRecord } from '@/utils/record-generator'
import { FileText } from 'lucide-react'
import { RecordPreview } from './RecordPreview'
import { TextField } from './TextField'
import type { TlsRptGeneratorProps } from './TlsRptGeneratorProps'

export function TlsRptGenerator({
  domain,
  initial,
}: Readonly<TlsRptGeneratorProps>) {
  const { values, setField } = useGeneratorFields(initial)
  return (
    <Panel
      icon={<FileText />}
      title="TLS-RPT"
      description="Where sending servers report TLS failures delivering to you."
    >
      <div className="space-y-4">
        <TextField
          id="tls-rpt-rua"
          label="Report addresses or https:// endpoints"
          value={values.destinations}
          placeholder="tls-reports@example.com"
          onChange={(value) => {
            setField('destinations', value)
          }}
        />
        <RecordPreview
          kind="TXT"
          host={`_smtp._tls.${domain}`}
          value={buildTlsRptRecord(splitList(values.destinations))}
        />
      </div>
    </Panel>
  )
}
