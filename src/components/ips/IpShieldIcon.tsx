import type { IpToneIconProps } from '@/types/ips'
import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react'

/** A shield shaped by a result: checked, crossed, or a warning. */
export function IpShieldIcon({ tone, className }: Readonly<IpToneIconProps>) {
  if (tone === 'success') return <ShieldCheck className={className} />
  if (tone === 'danger') return <ShieldX className={className} />
  return <ShieldAlert className={className} />
}
