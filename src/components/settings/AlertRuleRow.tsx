import { IconTile, StatusPill } from '@/components/ui'
import { ALERT_RULE_KIND_DESCRIPTIONS } from '@/constants/settings'
import { describeAlertRule } from '@/utils/settings'
import { BellRing } from 'lucide-react'
import { AlertRuleLastFired } from './AlertRuleLastFired'
import type { AlertRuleRowProps } from './AlertRuleRowProps'
import { EnabledSwitch } from './EnabledSwitch'
import { RowActionButtons } from './RowActionButtons'

/** One alert rule: kind, scope, condition, last firing and controls. */
export function AlertRuleRow({
  rule,
  actions,
  onEdit,
}: Readonly<AlertRuleRowProps>) {
  const busy = actions.busyId === rule.id
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <IconTile size="sm" tone={rule.enabled ? 'info' : 'unknown'}>
        <BellRing />
      </IconTile>
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-foreground text-sm font-medium">{rule.name}</p>
          <StatusPill tone="neutral">
            {ALERT_RULE_KIND_DESCRIPTIONS[rule.kind].label}
          </StatusPill>
          <StatusPill tone={rule.domainName === null ? 'info' : 'neutral'}>
            <span className={rule.domainName === null ? '' : 'font-mono'}>
              {rule.domainName ?? 'All domains'}
            </span>
          </StatusPill>
        </div>
        <p className="text-muted-foreground text-xs">
          {describeAlertRule(rule)}
        </p>
        <AlertRuleLastFired lastFiredAt={rule.lastFiredAt} />
      </div>
      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
        <EnabledSwitch
          checked={rule.enabled}
          label={`Enable ${rule.name}`}
          disabled={busy}
          onChange={(enabled) => {
            void actions.toggleEnabled(rule.id, enabled)
          }}
        />
        <RowActionButtons
          name={rule.name}
          busy={busy}
          onEdit={onEdit}
          onDelete={() => {
            actions.askDelete({ id: rule.id, name: rule.name })
          }}
        />
      </div>
    </li>
  )
}
