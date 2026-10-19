import type { ReportSourceItemProps } from '@/types/reports'
import { AuthResultCell } from './AuthResultCell'
import { SourceIpLink } from './SourceIpLink'
import { SourceVerdictCell } from './SourceVerdictCell'

/** One sending source of a report, one row of the sources table. */
export function ReportSourceRow({ source }: Readonly<ReportSourceItemProps>) {
  return (
    <tr className="hover:bg-accent/40 align-top transition-colors duration-150">
      <td className="px-4 py-3">
        <SourceIpLink ip={source.ip} countryCode={source.countryCode} />
      </td>
      <td
        className="text-muted-foreground max-w-56 truncate px-4 py-3 font-mono text-xs"
        title={source.hostname ?? undefined}
      >
        {source.hostname ?? 'No reverse DNS'}
      </td>
      <td className="text-foreground px-4 py-3 text-right font-mono tabular-nums">
        {source.messageCount.toLocaleString('en-US')}
      </td>
      <td className="px-4 py-3">
        <AuthResultCell
          result={source.spfAuthResult}
          aligned={source.spfAligned}
        />
      </td>
      <td className="px-4 py-3">
        <AuthResultCell
          result={source.primaryDkimResult ?? source.dkimResult}
          aligned={source.dkimAligned}
          identity={source.primaryDkimDomain}
        />
      </td>
      <td className="px-4 py-3">
        <SourceVerdictCell source={source} />
      </td>
    </tr>
  )
}
