import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ShieldCheck } from 'lucide-react'
import { ProtocolExplainer, RecordDisplay, SectionHeader } from '../shared'
import type { MtaStsDetailSectionProps } from './MtaStsDetailSectionProps'

export function MtaStsDetailSection({
  dns,
}: Readonly<MtaStsDetailSectionProps>) {
  const mta = dns.mtaSts

  return (
    <section className="bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="MTA-STS Configuration"
        found={mta.raw !== null}
        icon={<ShieldCheck className="text-primary h-6 w-6" />}
        helpText="MTA-STS protects inbound SMTP by telling senders which MX hosts are valid and that TLS should be enforced."
      />

      <RecordDisplay label="MTA-STS" record={mta.raw} />
      <ProtocolExplainer
        title="What must exist for MTA-STS to work"
        summary="You need both the DNS TXT record and an HTTPS policy file under mta-sts.<domain>/.well-known/mta-sts.txt. The TXT alone is not enough."
        exampleHost={`_mta-sts.${dns.domain}`}
        exampleValue="v=STSv1; id=20260422T000000"
      />

      {mta.raw !== null && (
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-foreground w-[180px] font-semibold">
                  Check
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Result
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  Valid Record
                </TableCell>
                <TableCell className="text-xs">
                  {mta.valid ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  Policy File Accessible
                </TableCell>
                <TableCell className="text-xs">
                  {mta.policyFileAccessible ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">Mode</TableCell>
                <TableCell className="text-xs capitalize">
                  {mta.mode ?? 'Unknown'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  Max Age (seconds)
                </TableCell>
                <TableCell className="text-xs">
                  {mta.fileAge ?? 'Unknown'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  Policy MX Records
                </TableCell>
                <TableCell className="text-xs">
                  {mta.mxRecords.length > 0 ? (
                    <ul className="list-inside list-disc">
                      {mta.mxRecords.map((mx) => (
                        <li key={mx}>{mx}</li>
                      ))}
                    </ul>
                  ) : (
                    'None found'
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  )
}
