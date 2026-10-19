import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import type { IpToneIconProps } from '@/types/ips'
import { CircleAlert, CircleCheck, CircleMinus, CircleX } from 'lucide-react'

/** The round pass, fail or partial mark of an authentication fact. */
export function IpAuthCheckIcon({
  tone,
  className,
}: Readonly<IpToneIconProps>) {
  const classes = cn(
    'h-5 w-5 shrink-0',
    STATUS_TONE_TEXT_CLASSES[tone],
    className,
  )
  if (tone === 'success')
    return <CircleCheck className={classes} aria-hidden="true" />
  if (tone === 'danger')
    return <CircleX className={classes} aria-hidden="true" />
  if (tone === 'warning')
    return <CircleAlert className={classes} aria-hidden="true" />
  return <CircleMinus className={classes} aria-hidden="true" />
}
