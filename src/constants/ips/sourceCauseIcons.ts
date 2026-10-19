import type { SourceCause } from '@/types/ips'
import type { LucideIcon } from 'lucide-react'
import {
  CircleHelp,
  Forward,
  KeyRound,
  ShieldCheck,
  ShieldX,
} from 'lucide-react'

/** The icon of each source cause pill. */
export const SOURCE_CAUSE_ICONS: Record<SourceCause, LucideIcon> = {
  'dmarc-pass': ShieldCheck,
  forwarding: Forward,
  'spf-unaligned': KeyRound,
  failing: ShieldX,
  unknown: CircleHelp,
}
