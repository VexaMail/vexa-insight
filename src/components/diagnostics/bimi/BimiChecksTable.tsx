import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { CheckRow } from '../shared'
import type { BimiChecksTableProps } from './BimiChecksTableProps'
import { BimiLinkCell } from './BimiLinkCell'

export function BimiChecksTable({ bimi }: Readonly<BimiChecksTableProps>) {
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
          <CheckRow label="Valid Record">{bimi.valid ? 'Yes' : 'No'}</CheckRow>
          <CheckRow label="Logo URL (l=)">
            <BimiLinkCell
              url={bimi.logoUrl}
              icon={<ImageIcon className="h-3 w-3" />}
            />
          </CheckRow>
          <CheckRow label="VMC Cert (a=)">
            <BimiLinkCell
              url={bimi.certificateUrl}
              icon={<LinkIcon className="h-3 w-3" />}
            />
          </CheckRow>
        </TableBody>
      </Table>
    </div>
  )
}
