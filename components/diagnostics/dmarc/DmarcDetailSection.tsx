import { ShieldCheck } from 'lucide-react'
import { ProtocolExplainer, RecordDisplay, SectionHeader } from '../shared'
import type { DmarcDetailSectionProps } from './DmarcDetailSectionProps'
import { DmarcExplainedTable } from './DmarcExplainedTable'

export function DmarcDetailSection({ dns }: Readonly<DmarcDetailSectionProps>) {
  return (
    <section className="bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="DMARC Configuration"
        found={dns.dmarc !== null}
        icon={<ShieldCheck className="text-primary h-6 w-6" />}
        helpText="DMARC tells receiving mail servers what to do when messages fail SPF and DKIM alignment checks."
      />

      <RecordDisplay label="DMARC" record={dns.dmarc} />
      <ProtocolExplainer
        title="What this record is for"
        summary="DMARC builds on SPF and DKIM alignment. Start with monitoring, then move to quarantine or reject once you are confident all legitimate senders are covered."
        exampleHost={`_dmarc.${dns.domain}`}
        exampleValue={`v=DMARC1; p=quarantine; rua=mailto:dmarc@${dns.domain}; pct=100`}
      />

      {dns.dmarcWarnings.length > 0 && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <h4 className="mb-2 text-sm font-semibold text-red-500">
            Issues Found
          </h4>
          <ul className="list-inside list-disc text-sm text-red-500/90">
            {dns.dmarcWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {dns.dmarc !== null && <DmarcExplainedTable tags={dns.dmarcTags} />}
    </section>
  )
}
