import { uniqueMxRecords } from '@/utils/diagnostics'
import { Database } from 'lucide-react'
import { SectionHeader } from '../shared'
import { DnsRecordList } from './DnsRecordList'
import type { DnsRecordsSectionProps } from './DnsRecordsSectionProps'
import { MxRecordList } from './MxRecordList'

export function DnsRecordsSection({ dns }: Readonly<DnsRecordsSectionProps>) {
  return (
    <section className="bg-card flex flex-col gap-5 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="DNS Records (A, NS, MX)"
        found={
          dns.aRecords.length > 0 ||
          dns.nsRecords.length > 0 ||
          dns.mx.length > 0
        }
        icon={<Database className="text-primary h-6 w-6" />}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DnsRecordList
          title="A Records"
          columnLabel="IP Address"
          emptyLabel="No A records found"
          values={[...new Set(dns.aRecords)]}
        />
        <DnsRecordList
          title="NS Records"
          columnLabel="Nameserver"
          emptyLabel="No NS records found"
          values={[...new Set(dns.nsRecords)]}
        />
        <MxRecordList records={uniqueMxRecords(dns.mx)} />
      </div>
    </section>
  )
}
