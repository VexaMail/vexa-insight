'use client'

import { Panel } from '@/components/ui'
import { useGeneratorFields } from '@/hooks/diagnostics'
import { spfOptionsFromFields } from '@/utils/diagnostics'
import { buildSpfRecord } from '@/utils/record-generator'
import { Send } from 'lucide-react'
import { RecordPreview } from './RecordPreview'
import { SpfGeneratorForm } from './SpfGeneratorForm'
import type { SpfGeneratorProps } from './SpfGeneratorProps'
import { SpfPlanner } from './SpfPlanner'

export function SpfGenerator({
  domain,
  domainId,
  prefill,
}: Readonly<SpfGeneratorProps>) {
  const fields = useGeneratorFields(prefill.fields)
  const record = buildSpfRecord(spfOptionsFromFields(fields.values))
  return (
    <Panel
      icon={<Send />}
      title="SPF"
      description="The servers allowed to send as the domain, within 10 DNS lookups."
    >
      <div className="space-y-4">
        <SpfGeneratorForm {...fields} />
        {prefill.unsupported.length === 0 ? null : (
          <p className="text-warning text-xs">
            Not carried over from the published record:{' '}
            <code className="font-mono break-all">
              {prefill.unsupported.join(' ')}
            </code>
            . Add them back to the copied value if they are still needed.
          </p>
        )}
        <RecordPreview kind="TXT" host={domain} value={record} />
        <SpfPlanner domainId={domainId} record={record} />
      </div>
    </Panel>
  )
}
