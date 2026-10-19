import { IconTile } from '@/components/ui'
import { ALERT_RULE_KIND_DESCRIPTIONS } from '@/constants/settings'
import { ArrowDownToLine, TrendingDown } from 'lucide-react'

/** What each rule kind watches, one line each. */
export function AlertRuleKindLegend() {
  return (
    <div className="mb-4 grid gap-2 sm:grid-cols-2">
      {(['compliance_drop', 'compliance_below'] as const).map((kind) => (
        <div
          key={kind}
          className="border-border bg-secondary/40 flex items-start gap-3 rounded-lg border p-3"
        >
          <IconTile size="sm" tone="info">
            {kind === 'compliance_drop' ? (
              <TrendingDown />
            ) : (
              <ArrowDownToLine />
            )}
          </IconTile>
          <div className="min-w-0">
            <p className="text-foreground text-sm font-medium">
              {ALERT_RULE_KIND_DESCRIPTIONS[kind].label}{' '}
              <code className="text-muted-foreground font-mono text-[11px] font-normal">
                {kind}
              </code>
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {ALERT_RULE_KIND_DESCRIPTIONS[kind].line}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
