import type { IpMenuItemKind } from '@/types/ips'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Ban,
  CircleCheck,
  CircleX,
  Clock,
  FileText,
  Landmark,
  List,
  Network,
  Route,
} from 'lucide-react'

/** The icon of each kind of menu link. */
export const IP_MENU_ICONS: Record<IpMenuItemKind, LucideIcon> = {
  diagnostics: Activity,
  reports: FileText,
  dns: Network,
  timeline: Clock,
  rdap: Landmark,
  rdns: Route,
  blocklist: Ban,
  'events-all': List,
  'events-fail': CircleX,
  'events-pass': CircleCheck,
}
