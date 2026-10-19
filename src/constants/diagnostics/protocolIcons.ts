import type { DomainScoreCheck } from '@/types/diagnostics'
import type { LucideIcon } from 'lucide-react'
import {
  FileText,
  Image,
  KeyRound,
  Mail,
  Network,
  ShieldCheck,
} from 'lucide-react'

/** The icon that stands for each protocol on tiles and finding rows. */
export const protocolIcons: Record<DomainScoreCheck['id'], LucideIcon> = {
  dmarc: Mail,
  spf: Network,
  dkim: KeyRound,
  mtaSts: ShieldCheck,
  tlsRpt: FileText,
  bimi: Image,
}
