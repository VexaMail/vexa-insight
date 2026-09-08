import type { ReportSource } from '@/types/reports'
import { deriveSourceSeverity } from './deriveSourceSeverity'
import { SourceAlignmentCell } from './SourceAlignmentCell'
import { SourceIpCell } from './SourceIpCell'
import { SourceSeverityDot } from './SourceSeverityDot'
import { SpfDkimBadge } from './SpfDkimBadge'

/** One sending source of a report, one row of the sources table. */
export function ReportSourceRow({
  source,
}: Readonly<{ source: ReportSource }>) {
  const isCritical =
    deriveSourceSeverity(source.spfAligned, source.dkimAligned) === 'critical'

  return (
    <tr
      className={
        isCritical
          ? 'bg-red-50/50 dark:bg-red-950/20'
          : 'bg-white dark:bg-zinc-800'
      }
    >
      <td className="px-3 py-2">
        <SourceSeverityDot
          spfAligned={source.spfAligned}
          dkimAligned={source.dkimAligned}
        />
      </td>
      <SourceIpCell ip={source.ip} countryCode={source.countryCode} />
      <td
        className="max-w-[200px] truncate px-3 py-2 text-zinc-600 dark:text-zinc-400"
        title={source.hostname ?? undefined}
      >
        {source.hostname ?? '—'}
      </td>
      <td className="px-3 py-2 text-right font-medium text-zinc-900 dark:text-zinc-50">
        {source.messageCount.toLocaleString()}
      </td>
      <td className="px-3 py-2 text-center">
        <SpfDkimBadge result={source.spfResult} />
      </td>
      <td className="px-3 py-2 text-center">
        <SpfDkimBadge result={source.dkimResult} />
      </td>
      <SourceAlignmentCell
        spfAligned={source.spfAligned}
        dkimAligned={source.dkimAligned}
      />
      <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
        {source.disposition}
      </td>
    </tr>
  )
}
