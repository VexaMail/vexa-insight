import type { ReportKpiTileId } from '@/types/reports'
import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  FileText,
  KeyRound,
  Mail,
  ShieldAlert,
  ShieldCheck,
  ShieldHalf,
} from 'lucide-react'

/** The icon in the square of each report KPI tile. */
export const REPORT_KPI_ICONS: Record<ReportKpiTileId, LucideIcon> = {
  reports: FileText,
  reporters: Building2,
  messages: Mail,
  failing: ShieldAlert,
  spf: ShieldHalf,
  dkim: KeyRound,
  dmarc: ShieldCheck,
}
