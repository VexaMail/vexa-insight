import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { Image as ImageIcon, Link as LinkIcon, ShieldCheck } from 'lucide-react'
import { ProtocolExplainer, RecordDisplay, SectionHeader } from '../shared'
import type { BimiDetailSectionProps } from './BimiDetailSectionProps'

export function BimiDetailSection({ dns }: Readonly<BimiDetailSectionProps>) {
  const bimi = dns.bimi

  return (
    <section className="bg-card flex flex-col gap-4 rounded-xl border p-5 shadow-sm">
      <SectionHeader
        title="BIMI Configuration"
        found={bimi.raw !== null}
        icon={<ShieldCheck className="text-primary h-6 w-6" />}
        helpText="BIMI lets participating mailbox providers display your brand logo when strong email authentication is already in place."
      />

      <RecordDisplay label="BIMI" record={bimi.raw} />
      <ProtocolExplainer
        title="When BIMI is worth adding"
        summary="BIMI usually does not fix delivery problems. It is a branding and trust layer that becomes useful after SPF, DKIM, and DMARC enforcement are already healthy."
        exampleHost={`default._bimi.${dns.domain}`}
        exampleValue="v=BIMI1; l=https://example.com/logo.svg; a=https://example.com/vmc.pem"
      />

      {bimi.raw !== null && (
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
                  {bimi.valid ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  Logo URL (l=)
                </TableCell>
                <TableCell className="text-xs">
                  {bimi.logoUrl ? (
                    <a
                      href={bimi.logoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary flex items-center gap-1 hover:underline"
                    >
                      <ImageIcon className="h-3 w-3" />
                      {bimi.logoUrl}
                    </a>
                  ) : (
                    'Not specified'
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs font-medium">
                  VMC Cert (a=)
                </TableCell>
                <TableCell className="text-xs">
                  {bimi.certificateUrl ? (
                    <a
                      href={bimi.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary flex items-center gap-1 hover:underline"
                    >
                      <LinkIcon className="h-3 w-3" />
                      {bimi.certificateUrl}
                    </a>
                  ) : (
                    'Not specified'
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
