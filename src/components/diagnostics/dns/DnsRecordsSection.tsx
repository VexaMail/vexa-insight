import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { Database } from 'lucide-react'
import { SectionHeader } from '../shared'
import type { DnsRecordsSectionProps } from './DnsRecordsSectionProps'

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
        {/* A Records */}
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground text-sm font-semibold tracking-wider uppercase">
            A Records
          </h4>
          <div className="flex-1 overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-foreground font-semibold">
                    IP Address
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dns.aRecords.length > 0 ? (
                  dns.aRecords.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{a}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-muted-foreground text-xs italic">
                      No A records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* NS Records */}
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground text-sm font-semibold tracking-wider uppercase">
            NS Records
          </h4>
          <div className="flex-1 overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-foreground font-semibold">
                    Nameserver
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dns.nsRecords.length > 0 ? (
                  dns.nsRecords.map((ns, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-mono text-xs">{ns}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-muted-foreground text-xs italic">
                      No NS records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* MX Records */}
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground text-sm font-semibold tracking-wider uppercase">
            MX Records
          </h4>
          <div className="flex-1 overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="text-foreground w-[80px] font-semibold">
                    Priority
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Exchange Server
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dns.mx.length > 0 ? (
                  dns.mx.map((mx, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs font-medium">
                        {mx.priority}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {mx.exchange}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-muted-foreground text-xs italic"
                    >
                      No MX records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}
