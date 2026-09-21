import type { DomainScoreBreakdownProps } from './DomainScoreBreakdownProps'
import { DomainScoreCheckRow } from './DomainScoreCheckRow'

/**
 * Why the score is what it is. Core checks (SPF, DKIM, DMARC) make up the 100
 * points; the hardening ones only add on top, so a missing BIMI record never
 * explains a low grade.
 */
export function DomainScoreBreakdown({
  score,
}: Readonly<DomainScoreBreakdownProps>) {
  const core = score.checks.filter((check) => check.weight === 'core')
  const bonus = score.checks.filter((check) => check.weight === 'bonus')

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-foreground text-sm font-semibold">
          Authentication core
        </h3>
        <span className="text-muted-foreground font-mono text-xs tabular-nums">
          {score.coreScore}/100
        </span>
      </div>
      <div className="divide-border mt-1 divide-y">
        {core.map((check) => (
          <DomainScoreCheckRow key={check.id} check={check} />
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-foreground text-sm font-semibold">
          Hardening bonus
        </h3>
        <span className="text-muted-foreground font-mono text-xs tabular-nums">
          +{score.bonusScore}
        </span>
      </div>
      <div className="divide-border mt-1 divide-y">
        {bonus.map((check) => (
          <DomainScoreCheckRow key={check.id} check={check} />
        ))}
      </div>
    </div>
  )
}
