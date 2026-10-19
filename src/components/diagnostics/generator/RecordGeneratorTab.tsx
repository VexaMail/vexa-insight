import {
  dmarcFieldsFromTags,
  mtaStsFieldsFromDns,
  spfPrefillFromRecord,
  tlsRptFieldsFromDns,
} from '@/utils/diagnostics'
import { DmarcGenerator } from './DmarcGenerator'
import { MtaStsGenerator } from './MtaStsGenerator'
import type { RecordGeneratorTabProps } from './RecordGeneratorTabProps'
import { SpfGenerator } from './SpfGenerator'
import { TlsRptGenerator } from './TlsRptGenerator'

/** One form per record, each starting from what the last run found. */
export function RecordGeneratorTab({
  dns,
  checkedAt,
  domainId,
}: Readonly<RecordGeneratorTabProps>) {
  return (
    <>
      <p className="text-muted-foreground max-w-3xl text-sm">
        Each form starts from the records published at the last run. Nothing is
        published from here: copy the value into your DNS provider, then re-run
        diagnostics to verify it.
      </p>
      <div className="grid items-start gap-4 xl:grid-cols-2">
        <DmarcGenerator
          domain={dns.domain}
          initial={dmarcFieldsFromTags(dns.dmarcTags)}
        />
        <SpfGenerator
          domain={dns.domain}
          domainId={domainId}
          prefill={spfPrefillFromRecord(dns.spf)}
        />
        <MtaStsGenerator
          domain={dns.domain}
          initial={mtaStsFieldsFromDns({ dns, checkedAt })}
        />
        <TlsRptGenerator
          domain={dns.domain}
          initial={tlsRptFieldsFromDns(dns)}
        />
      </div>
    </>
  )
}
