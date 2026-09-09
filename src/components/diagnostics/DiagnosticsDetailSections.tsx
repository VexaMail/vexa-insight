'use client'

import { BimiDetailSection } from './bimi/BimiDetailSection'
import type { DiagnosticsDetailSectionsProps } from './DiagnosticsDetailSectionsProps'
import { DkimDetailSection } from './dkim/DkimDetailSection'
import { DmarcDetailSection } from './dmarc/DmarcDetailSection'
import { DnsRecordsSection } from './dns/DnsRecordsSection'
import { MtaStsDetailSection } from './mtasts/MtaStsDetailSection'
import { SpfDetailSection } from './spf/SpfDetailSection'
import { SpfLookupTreeSection } from './spf/SpfLookupTreeSection'
import { TlsRptDetailSection } from './tlsrpt/TlsRptDetailSection'

/** The eight protocol sections, collapsed until opened here or from an overview row. */
export function DiagnosticsDetailSections({
  dns,
  getSectionProps,
}: Readonly<DiagnosticsDetailSectionsProps>) {
  return (
    <div className="flex flex-col gap-6">
      <DnsRecordsSection dns={dns} {...getSectionProps('dns')} />
      <DmarcDetailSection dns={dns} {...getSectionProps('dmarc')} />
      <SpfDetailSection dns={dns} {...getSectionProps('spf')} />
      <SpfLookupTreeSection dns={dns} {...getSectionProps('spf-tree')} />
      <DkimDetailSection dns={dns} {...getSectionProps('dkim')} />
      <BimiDetailSection dns={dns} {...getSectionProps('bimi')} />
      <MtaStsDetailSection dns={dns} {...getSectionProps('mta-sts')} />
      <TlsRptDetailSection dns={dns} {...getSectionProps('tls-rpt')} />
    </div>
  )
}
