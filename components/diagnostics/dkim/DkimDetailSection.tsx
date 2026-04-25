import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { KeyRound, ShieldCheck } from 'lucide-react'
import { ProtocolExplainer, RecordDisplay, SectionHeader } from '../shared'
import type { DkimDetailSectionProps } from './DkimDetailSectionProps'

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
          <div
            key={parsed.selector}
            className="flex flex-col gap-4 rounded-lg border p-4"
          >
            <div className="flex items-center gap-2 border-b pb-3">
              <KeyRound className="text-muted-foreground h-4 w-4" />
              <h4 className="text-foreground text-sm font-bold">
                Selector:{' '}
                <span className="text-primary font-mono">
                  {parsed.selector}
                </span>
              </h4>
            </div>

            <RecordDisplay label="DKIM" record={parsed.raw} />

            {parsed.errors.length > 0 && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <h5 className="mb-1 text-xs font-semibold text-red-500">
                  Issues Found
                </h5>
                <ul className="list-inside list-disc text-xs text-red-500/90">
                  {parsed.errors.map((err: string, i: number) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {parsed.raw !== null && (
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="text-foreground w-[150px] font-semibold">
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
                        {parsed.valid ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">
                        Version
                      </TableCell>
                      <TableCell className="text-xs">
                        {parsed.version ?? 'Unknown'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">
                        Key Type
                      </TableCell>
                      <TableCell className="text-xs uppercase">
                        {parsed.keyType ?? 'Unknown'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">
                        Key Length
                      </TableCell>
                      <TableCell className="text-xs">
                        {parsed.keyLengthBits
                          ? `~${parsed.keyLengthBits} bits`
                          : 'Unknown'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs font-medium">
                        Public Key
                      </TableCell>
                      <TableCell className="text-xs">
                        {parsed.publicKeyPresent ? 'Present' : 'Missing'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
