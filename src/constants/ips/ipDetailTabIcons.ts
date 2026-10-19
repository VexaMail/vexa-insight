import type { IpDetailTab } from '@/types/ips'
import type { LucideIcon } from 'lucide-react'
import {
  Braces,
  Clock,
  FileText,
  Globe,
  LayoutGrid,
  Network,
} from 'lucide-react'

/** The icon of each tab of a source page. */
export const IP_DETAIL_TAB_ICONS: Record<IpDetailTab, LucideIcon> = {
  overview: LayoutGrid,
  timeline: Clock,
  domains: Globe,
  reports: FileText,
  dns: Network,
  raw: Braces,
}
