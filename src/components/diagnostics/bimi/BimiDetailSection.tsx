import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer, RecordDisplay } from '../shared'
import { BimiChecksTable } from './BimiChecksTable'
import type { BimiDetailSectionProps } from './BimiDetailSectionProps'

export function BimiDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<BimiDetailSectionProps>) {
  const bimi = dns.bimi

  return (
    <CollapsibleSection
      id="bimi"
      open={open}
      onToggle={onToggle}
      title="BIMI Configuration"
      found={bimi.raw !== null}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="BIMI lets participating mailbox providers display your brand logo when strong email authentication is already in place."
    >
      <RecordDisplay label="BIMI" record={bimi.raw} />
      <ProtocolExplainer
        title="When BIMI is worth adding"
        summary="BIMI usually does not fix delivery problems. It is a branding and trust layer that becomes useful after SPF, DKIM, and DMARC enforcement are already healthy."
        exampleHost={`default._bimi.${dns.domain}`}
        exampleValue="v=BIMI1; l=https://example.com/logo.svg; a=https://example.com/vmc.pem"
      />

      {bimi.raw !== null && <BimiChecksTable bimi={bimi} />}
    </CollapsibleSection>
  )
}
