import { StatusPill } from '@/components/ui'
import { describeAuthRate } from '@/utils/domains'
import { verdictPillVariant } from '@/utils/ui'
import type { AuthPillProps } from './AuthPillProps'
import { ToneIcon } from './ToneIcon'

/** One auth fact of a source as a pill: Pass, Fail or the passing share. */
export function AuthPill({ label, pass, total }: Readonly<AuthPillProps>) {
  const display = describeAuthRate(pass, total)
  const icon = <ToneIcon tone={display.tone} />
  return (
    <StatusPill
      tone={display.tone}
      variant={verdictPillVariant(display.tone)}
      icon={
        display.tone === 'success' || display.tone === 'danger' ? icon : null
      }
      title={label ? `${label}: ${display.title}` : display.title}
      className="px-1.5"
    >
      {label ? <span className="font-normal opacity-75">{label}</span> : null}
      {display.label}
    </StatusPill>
  )
}
