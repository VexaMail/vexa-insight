import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { DmarcExplainedTableProps } from './DmarcExplainedTableProps'

export function DmarcExplainedTable({
  tags,
}: Readonly<DmarcExplainedTableProps>) {
  if (tags.length === 0) return null

  return (
    <div className="mt-6 flex flex-col gap-3">
      <h4 className="text-foreground text-sm font-bold tracking-wide uppercase">
        DMARC Explained
      </h4>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-foreground w-[120px] font-semibold">
                Tag
              </TableHead>
              <TableHead className="text-foreground w-[120px] font-semibold">
                Value
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.tag}>
                <TableCell className="font-mono text-xs">{tag.tag}</TableCell>
                <TableCell className="text-foreground font-medium">
                  {tag.value}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {tag.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
