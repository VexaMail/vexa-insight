import { PHONE_SOURCE_LIMIT } from '@/constants/domains'
import { topSourcesByVolume } from '@/utils/domains'
import { SourcePhoneRow } from './SourcePhoneRow'
import type { SourcesPhoneListProps } from './SourcesPhoneListProps'

/** The filtered sources as row summaries, for phone widths. */
export function SourcesPhoneList({ rows }: Readonly<SourcesPhoneListProps>) {
  const shown = topSourcesByVolume(rows, PHONE_SOURCE_LIMIT)
  return (
    <div className="space-y-2">
      <ul className="border-border divide-border divide-y rounded-md border">
        {shown.map((row) => (
          <SourcePhoneRow key={row.sourceIp} row={row} />
        ))}
        {shown.length === 0 ? (
          <li className="text-muted-foreground p-6 text-center text-sm">
            No source matches the filters.
          </li>
        ) : null}
      </ul>
      {rows.length > shown.length ? (
        <p className="text-muted-foreground text-xs">
          The {shown.length} largest of {rows.length} sources. The CSV and a
          wider screen list all of them.
        </p>
      ) : null}
    </div>
  )
}
