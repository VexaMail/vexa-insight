import { IpFlag } from '@/components/ips'
import { CopyIconButton, SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import type { SourceRow } from '../SourceRow'

/** The sortable source IP column: flag, link to the source, copy control. */
export function createSourceIpColumn(): ColumnDef<
  typeof dataTableFeatures,
  SourceRow
> {
  return {
    accessorKey: 'sourceIp',
    header: ({ column }) => (
      <SortableHeaderButton column={column} label="IP address" />
    ),
    cell: ({ row }) => {
      const { sourceIp, countryCode, countryName } = row.original
      return (
        <div className="flex min-w-0 items-center gap-2">
          <IpFlag
            countryCode={countryCode ?? null}
            countryName={countryName ?? null}
          />
          <Link
            href={`/ips/${encodeURIComponent(sourceIp)}`}
            className="text-info hover:text-primary font-mono text-sm whitespace-nowrap"
          >
            {sourceIp}
          </Link>
          <CopyIconButton
            value={sourceIp}
            label="IP address"
            className="h-7 w-7"
          />
        </div>
      )
    },
  }
}
