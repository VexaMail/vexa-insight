'use client'

import { formatRelativeDate } from '@/utils/format'
import { isoDateToEpochSeconds } from '@/utils/updates'
import type { UpdateStatusMetaGridProps } from './UpdateStatusMetaGridProps'

export default function UpdateStatusMetaGrid({
  status,
}: Readonly<UpdateStatusMetaGridProps>) {
  const lastCheckedSeconds = isoDateToEpochSeconds(status.lastCheckedAt)
  const publishedSeconds = isoDateToEpochSeconds(status.latestPublishedAt)
  const lastCheckedLabel = lastCheckedSeconds
    ? formatRelativeDate(lastCheckedSeconds).relative
    : 'never'
  const latestLabel = status.latestVersion ? `v${status.latestVersion}` : '—'

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div>
        <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
          Installed
        </p>
        <p className="text-foreground font-mono text-sm">
          v{status.currentVersion}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
          Latest released
        </p>
        <p className="text-foreground font-mono text-sm">{latestLabel}</p>
        {publishedSeconds ? (
          <p className="text-muted-foreground text-[11px]">
            {formatRelativeDate(publishedSeconds).absolute}
          </p>
        ) : null}
      </div>
      <div>
        <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
          Last checked
        </p>
        <p className="text-foreground text-sm">{lastCheckedLabel}</p>
        <p className="text-muted-foreground font-mono text-[11px]">
          {status.repoSlug}
        </p>
      </div>
    </div>
  )
}
