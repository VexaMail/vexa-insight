'use client'

import { Panel } from '@/components/ui'
import { useGeneratorFields } from '@/hooks/diagnostics'
import { dmarcOptionsFromFields } from '@/utils/diagnostics'
import { buildDmarcRecord } from '@/utils/record-generator'
import { ShieldCheck } from 'lucide-react'
import { DmarcGeneratorForm } from './DmarcGeneratorForm'
import type { DmarcGeneratorProps } from './DmarcGeneratorProps'
import { RecordPreview } from './RecordPreview'

export function DmarcGenerator({
  domain,
  initial,
}: Readonly<DmarcGeneratorProps>) {
  const fields = useGeneratorFields(initial)
  return (
    <Panel
      icon={<ShieldCheck />}
      title="DMARC"
      description="The policy receivers apply to mail that fails, and where they report."
    >
      <div className="space-y-4">
        <DmarcGeneratorForm {...fields} />
        <RecordPreview
          kind="TXT"
          host={`_dmarc.${domain}`}
          value={buildDmarcRecord(dmarcOptionsFromFields(fields.values))}
        />
      </div>
    </Panel>
  )
}
