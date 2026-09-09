import { sharePercent } from '@/utils/dashboard'
import Link from 'next/link'
import { ShareBar } from './ShareBar'
import type { VolumeByOrgRowProps } from './VolumeByOrgRowProps'

/** One reporting organization, linking to its filtered reports list. */
export function VolumeByOrgRow({
  row,
  maxCount,
}: Readonly<VolumeByOrgRowProps>) {
  return (
    <Link
      href={`/reports?org=${encodeURIComponent(row.orgName)}`}
      className="-mx-3 block space-y-1.5 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
    >
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground font-medium">{row.orgName}</span>
        <span className="text-muted-foreground">
          {row.reportCount.toLocaleString()}
        </span>
      </div>
      <ShareBar
        percent={sharePercent(row.reportCount, maxCount)}
        className="bg-primary"
      />
    </Link>
  )
}
