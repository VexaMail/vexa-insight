import type { IpAuthCheckIconProps } from '@/types/ips'
import { Key, KeyRound, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react'

/** Shields for SPF and DMARC facts, keys for DKIM, shaped by the verdict. */
export function IpAuthCheckIcon({
  checkKey,
  tone,
}: Readonly<IpAuthCheckIconProps>) {
  if (checkKey === 'dkim-auth') return <KeyRound />
  if (checkKey === 'dkim-aligned') return <Key />
  if (tone === 'success') return <ShieldCheck />
  if (tone === 'danger') return <ShieldX />
  return <ShieldAlert />
}
