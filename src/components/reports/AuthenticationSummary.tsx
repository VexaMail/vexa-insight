import { IconTile } from '@/components/ui'
import type { AuthenticationSummaryProps } from './AuthenticationSummaryProps'
import { AUTH_SUMMARY_STATUS_ICON } from './authSummaryStatusIcon'
import { AUTH_SUMMARY_STATUS_TONE } from './authSummaryStatusTone'
import { deriveAuthSummaryNarrative } from './deriveAuthSummaryNarrative'
import { deriveDominantDisposition } from './deriveDominantDisposition'

/** One sentence on what the report says, tinted by how it went. */
export function AuthenticationSummary({
  stats,
  sources,
}: Readonly<AuthenticationSummaryProps>) {
  const dominantDisposition = deriveDominantDisposition(sources)
  const narrative = deriveAuthSummaryNarrative(stats, dominantDisposition)
  const Icon = AUTH_SUMMARY_STATUS_ICON[narrative.status]

  return (
    <div className="glass-card flex items-center gap-3 px-4 py-3">
      <IconTile size="sm" tone={AUTH_SUMMARY_STATUS_TONE[narrative.status]}>
        <Icon />
      </IconTile>
      <p className="text-foreground text-sm leading-relaxed">
        {narrative.text}
      </p>
    </div>
  )
}
