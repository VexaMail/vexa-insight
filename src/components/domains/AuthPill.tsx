import { StatusPill } from '@/components/ui'
import { describeAuthRate } from '@/utils/domains'
import type { AuthPillProps } from './AuthPillProps'

/** One auth fact of a source as a pill: Pass, Fail or the passing share. */
export function AuthPill({ label, pass, total }: Readonly<AuthPillProps>) {
  const display = describeAuthRate(pass, total)
  return (
    <span title={label ? `${label}: ${display.title}` : display.title}>
      <StatusPill tone={display.tone} className="px-1.5">
        {label ? <span className="font-normal opacity-75">{label}</span> : null}
        {display.label}
      </StatusPill>
    </span>
  )
}
