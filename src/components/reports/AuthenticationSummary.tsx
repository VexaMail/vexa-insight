import type { AuthenticationSummaryProps } from './AuthenticationSummaryProps'
import { AUTH_SUMMARY_STATUS_ICON } from './authSummaryStatusIcon'
import { AUTH_SUMMARY_STATUS_STYLES } from './authSummaryStatusStyles'
import { deriveAuthSummaryNarrative } from './deriveAuthSummaryNarrative'
import { deriveDominantDisposition } from './deriveDominantDisposition'

export function AuthenticationSummary({
  stats,
  sources,
}: Readonly<AuthenticationSummaryProps>) {
  const dominantDisposition = deriveDominantDisposition(sources)
  const narrative = deriveAuthSummaryNarrative(stats, dominantDisposition)
  const Icon = AUTH_SUMMARY_STATUS_ICON[narrative.status]

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${AUTH_SUMMARY_STATUS_STYLES[narrative.status]}`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p className="text-foreground text-sm leading-relaxed">
        {narrative.text}
      </p>
    </div>
  )
}
