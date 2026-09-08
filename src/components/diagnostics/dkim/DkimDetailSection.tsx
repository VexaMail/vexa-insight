import { ShieldCheck } from 'lucide-react'
import { ProtocolExplainer, SectionHeader } from '../shared'
import type { DkimDetailSectionProps } from './DkimDetailSectionProps'
import { DkimSelectorCard } from './DkimSelectorCard'

export function DkimDetailSection({ dns }: Readonly<DkimDetailSectionProps>) {
  const parsedRecords = dns.dkimParsedRecords
  const foundAny = parsedRecords.some((record) => record.raw !== null)

  return (
    <section className="bg-card flex flex-col gap-6 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="DKIM Configuration"
        found={foundAny}
        icon={<ShieldCheck className="text-primary h-6 w-6" />}
        helpText="DKIM publishes public keys in DNS so receivers can verify that messages were signed by an authorized sender and not altered in transit."
      />
      <ProtocolExplainer
        title="How to read DKIM"
        summary="Each selector is a separate DNS record under <selector>._domainkey. Only selectors actually used by your senders matter. Missing common probes are informational unless your real traffic depends on them."
        exampleHost={`default._domainkey.${dns.domain}`}
        exampleValue="v=DKIM1; k=rsa; p=PUBLIC_KEY_BASE64"
      />

      <div className="flex flex-col gap-6">
        {parsedRecords.map((parsed) => (
          <DkimSelectorCard key={parsed.selector} parsed={parsed} />
        ))}
      </div>
    </section>
  )
}
