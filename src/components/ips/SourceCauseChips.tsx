import {
  SOURCE_CAUSE_HINTS,
  SOURCE_CAUSE_LABELS,
  SOURCE_CAUSE_ORDER,
  SOURCE_CAUSE_TONES,
} from '@/constants/ips'
import type { SourceCauseChipsProps } from '@/types/ips'
import { SourceCauseChip } from './SourceCauseChip'

/**
 * Filters of the sources list by why each source passes or fails DMARC, with
 * how many sources each one holds and, for the active one, what it means.
 */
export function SourceCauseChips({
  counts,
  total,
  active,
  hrefs,
}: Readonly<SourceCauseChipsProps>) {
  return (
    <div className="space-y-2">
      <nav
        aria-label="Filter sources by cause"
        className="flex flex-wrap gap-2"
      >
        <SourceCauseChip
          href={hrefs.all}
          label="All sources"
          count={total}
          tone="neutral"
          active={active === null}
        />
        {SOURCE_CAUSE_ORDER.map((cause) => (
          <SourceCauseChip
            key={cause}
            href={hrefs[cause]}
            label={SOURCE_CAUSE_LABELS[cause]}
            count={counts[cause]}
            tone={SOURCE_CAUSE_TONES[cause]}
            active={active === cause}
            title={SOURCE_CAUSE_HINTS[cause]}
          />
        ))}
      </nav>
      <p className="text-muted-foreground text-xs">
        {active === null
          ? 'Causes come from the stored SPF, DKIM and alignment results of each source in the window.'
          : SOURCE_CAUSE_HINTS[active]}
      </p>
    </div>
  )
}
