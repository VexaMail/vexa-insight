'use client'

import { Panel } from '@/components/ui'
import { useGeneratorFields } from '@/hooks/diagnostics'
import { mtaStsOptionsFromFields } from '@/utils/diagnostics'
import {
  buildMtaStsPolicy,
  buildMtaStsTxtRecord,
} from '@/utils/record-generator'
import { Lock } from 'lucide-react'
import { MtaStsGeneratorForm } from './MtaStsGeneratorForm'
import type { MtaStsGeneratorProps } from './MtaStsGeneratorProps'
import { RecordPreview } from './RecordPreview'

export function MtaStsGenerator({
  domain,
  initial,
}: Readonly<MtaStsGeneratorProps>) {
  const fields = useGeneratorFields(initial)
  return (
    <Panel
      icon={<Lock />}
      title="MTA-STS"
      description="Makes sending servers require TLS to your MX hosts. Change the id whenever the policy changes."
    >
      <div className="space-y-4">
        <MtaStsGeneratorForm {...fields} />
        <RecordPreview
          kind="TXT"
          host={`_mta-sts.${domain}`}
          value={buildMtaStsTxtRecord(fields.values.id)}
        />
        <RecordPreview
          kind="HTTPS"
          host={`https://mta-sts.${domain}/.well-known/mta-sts.txt`}
          value={buildMtaStsPolicy(mtaStsOptionsFromFields(fields.values))}
        />
      </div>
    </Panel>
  )
}
