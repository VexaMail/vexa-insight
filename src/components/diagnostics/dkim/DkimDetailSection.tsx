import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer } from '../shared'
import { DkimCheckedSelectors } from './DkimCheckedSelectors'
import type { DkimDetailSectionProps } from './DkimDetailSectionProps'
import { DkimSelectorCard } from './DkimSelectorCard'

export function DkimDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<DkimDetailSectionProps>) {
  const published = dns.dkimParsedRecords.filter(
    (record) => record.raw !== null,
  )
  const foundAny = published.length > 0

  return (
    <CollapsibleSection
      id="dkim"
      open={open}
      onToggle={onToggle}
      title="DKIM Configuration"
      found={foundAny}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="DKIM publishes public keys in DNS so receivers can verify that messages were signed by an authorized sender and not altered in transit."
    >
      <ProtocolExplainer
        title="How to read DKIM"
        summary="Each selector is a separate DNS record under <selector>._domainkey. Only selectors actually used by your senders matter. Missing common probes are informational unless your real traffic depends on them."
        exampleHost={`default._domainkey.${dns.domain}`}
        exampleValue="v=DKIM1; k=rsa; p=PUBLIC_KEY_BASE64"
      />

      <DkimCheckedSelectors records={dns.dkim} />

      {foundAny ? (
        <div className="flex flex-col gap-6">
          {published.map((parsed) => (
            <DkimSelectorCard key={parsed.selector} parsed={parsed} />
          ))}
        </div>
      ) : null}
    </CollapsibleSection>
  )
}
