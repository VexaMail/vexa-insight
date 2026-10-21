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
            basic and include/redirect dependency checks, including valid ~all
            policies. A valid DMARC policy earns 30 points, plus up to 10 for
            quarantine or 20 for reject, scaled by its pct setting. A DNS
            failure leaves the score unavailable. DKIM and MX do not affect this
            score. Lookup counts are static upper bounds. Sender-specific SPF
            evaluation and actual message authentication need further evidence.
            Inherited DMARC uses the RFC 9989 DNS tree walk; t=y lowers its
            policy. Legacy pct is used conservatively in this rubric, although
            current receivers may ignore it.
          </p>
        </details>
      </div>
    </div>
  )
}
