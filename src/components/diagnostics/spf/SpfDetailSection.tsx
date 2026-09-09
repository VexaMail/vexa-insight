import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer, RecordDisplay } from '../shared'
import { SpfCheckCard } from './SpfCheckCard'
import type { SpfDetailSectionProps } from './SpfDetailSectionProps'

export function SpfDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<SpfDetailSectionProps>) {
  return (
    <CollapsibleSection
      id="spf"
      open={open}
      onToggle={onToggle}
      title="SPF Configuration"
      found={dns.spf !== null}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="SPF defines which servers are allowed to send mail for the domain in the SMTP envelope."
    >
      <RecordDisplay label="SPF" record={dns.spf} />
      <ProtocolExplainer
        title="How to read SPF"
        summary="A healthy SPF record authorizes all legitimate senders and ends with an explicit all-mechanism. Use ~all while validating coverage, then move to -all once you are sure nothing legitimate is missing."
        exampleHost={dns.domain}
        exampleValue={`v=spf1 include:mail.example.net ip4:203.0.113.10 -all`}
      />

      {dns.spfWarning !== null && dns.spfWarning !== '' && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <h4 className="mb-1 text-sm font-semibold text-red-500">
            Important Notice
          </h4>
          <p className="text-sm text-red-500/90">{dns.spfWarning}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {dns.spfValidationCategories.map((cat) => (
          <SpfCheckCard
            key={cat.category}
            category={cat.category}
            checks={cat.checks}
          />
        ))}
      </div>
    </CollapsibleSection>
  )
}
