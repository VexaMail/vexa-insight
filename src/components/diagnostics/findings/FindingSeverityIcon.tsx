import { findingSeverityTones } from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import type { FindingSeverityProps } from './FindingSeverityProps'
import { findingSeverityIcons } from './findingSeverityIcons'

export function FindingSeverityIcon({
  severity,
}: Readonly<FindingSeverityProps>) {
  const Icon = findingSeverityIcons[severity]
  return (
    <Icon
      aria-hidden
      className={STATUS_TONE_TEXT_CLASSES[findingSeverityTones[severity]]}
    />
  )
}
