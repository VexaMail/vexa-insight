import type { PublicScoreProps } from '../../types/public-check/PublicScoreProps'
import { PublicScoreGauge } from './PublicScoreGauge'

export function PublicScore({ score }: Readonly<PublicScoreProps>) {
  return (
    <div
      className="bg-card mb-6 grid gap-5 rounded-xl border p-6 sm:grid-cols-[auto_1fr] sm:items-center"
      aria-label="Configuration score"
    >
      <PublicScoreGauge score={score} />
      <div>
        <h2 className="font-semibold tracking-normal">
          SPF &amp; DMARC configuration score
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          SPF {score.spf ?? 'not checked'}/50 · DMARC{' '}
          {score.dmarc ?? 'not checked'}/50
        </p>
        <details className="mt-3 text-sm">
          <summary className="text-primary cursor-pointer py-3 font-medium">
            How the score works
          </summary>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            Vexa’s DNS rubric awards 50 points for a single SPF record passing
            basic checks, including valid ~all policies. A valid DMARC policy
            earns 30 points, plus up to 10 for quarantine or 20 for reject,
            scaled by its pct setting. A DNS failure leaves the score
            unavailable. DKIM and MX do not affect this score. Recursive SPF
            dependencies, inherited DMARC policies and actual message
            authentication need further evidence.
          </p>
        </details>
      </div>
    </div>
  )
}
