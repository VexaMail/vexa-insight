import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer, RecordDisplay } from '../shared'
import { MtaStsChecksTable } from './MtaStsChecksTable'
import type { MtaStsDetailSectionProps } from './MtaStsDetailSectionProps'

export function MtaStsDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<MtaStsDetailSectionProps>) {
  const mta = dns.mtaSts

  return (
    <CollapsibleSection
      id="mta-sts"
      open={open}
      onToggle={onToggle}
      title="MTA-STS Configuration"
      found={mta.raw !== null}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="MTA-STS protects inbound SMTP by telling senders which MX hosts are valid and that TLS should be enforced."
    >
      <RecordDisplay label="MTA-STS" record={mta.raw} />
      <ProtocolExplainer
        title="What must exist for MTA-STS to work"
        summary="You need both the DNS TXT record and an HTTPS policy file under mta-sts.<domain>/.well-known/mta-sts.txt. The TXT alone is not enough."
        exampleHost={`_mta-sts.${dns.domain}`}
        exampleValue="v=STSv1; id=20260422T000000"
      />

      {mta.raw !== null && <MtaStsChecksTable mta={mta} />}
    </CollapsibleSection>
  )
}
