import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { DkimParsedRecord } from '@/types/diagnostics'

/** Parsed-field summary of one DKIM selector record. */
export function DkimSelectorChecks({
  parsed,
}: Readonly<{ parsed: DkimParsedRecord }>) {
  const checks: [string, string][] = [
    ['Valid Record', parsed.valid ? 'Yes' : 'No'],
    ['Version', parsed.version ?? 'Unknown'],
    ['Key Type', parsed.keyType ?? 'Unknown'],
    [
      'Key Length',
      parsed.keyLengthBits
        ? `~${String(parsed.keyLengthBits)} bits`
        : 'Unknown',
    ],
    ['Public Key', parsed.publicKeyPresent ? 'Present' : 'Missing'],
  ]

  return (
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
          {checks.map(([label, value]) => (
            <TableRow key={label}>
              <TableCell className="text-xs font-medium">{label}</TableCell>
              <TableCell
                className={
                  label === 'Key Type' ? 'text-xs uppercase' : 'text-xs'
                }
              >
                {value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
