import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { ShieldCheck } from 'lucide-react'
import { CollapsibleSection, ProtocolExplainer, RecordDisplay } from '../shared'
import type { TlsRptDetailSectionProps } from './TlsRptDetailSectionProps'

export function TlsRptDetailSection({
  dns,
  open,
  onToggle,
}: Readonly<TlsRptDetailSectionProps>) {
  const tls = dns.tlsRpt

  return (
    <CollapsibleSection
      id="tls-rpt"
      open={open}
      onToggle={onToggle}
      title="TLS-RPT Configuration"
      found={tls.raw !== null}
      icon={<ShieldCheck className="text-primary h-6 w-6" />}
      helpText="TLS-RPT provides reporting for failed TLS delivery attempts and complements MTA-STS with operational visibility."
    >
      <RecordDisplay label="TLS-RPT" record={tls.raw} />
      <ProtocolExplainer
        title="Why TLS-RPT matters"
        summary="TLS-RPT does not enforce transport security by itself, but it tells you when remote senders fail TLS negotiation or fail to apply your MTA-STS policy."
        exampleHost={`_smtp._tls.${dns.domain}`}
        exampleValue={`v=TLSRPTv1; rua=mailto:tlsrpt@${dns.domain}`}
      />

      {tls.raw !== null && (
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
                  {tls.valid ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top text-xs font-medium">
                  Reporting Addresses (rua=)
                </TableCell>
                <TableCell className="text-xs">
                  {tls.ruaAddresses.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {tls.ruaAddresses.map((rua) => (
                        <li key={rua} className="font-mono">
                          {rua}
                        </li>
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
    </CollapsibleSection>
  )
}
