import type { IpMenuTrigger } from '@/types/ips'
import type { LucideIcon } from 'lucide-react'
import { ExternalLink, ListFilter, Search } from 'lucide-react'

/** The leading icon of each menu trigger. */
export const IP_MENU_TRIGGER_ICONS: Record<IpMenuTrigger, LucideIcon> = {
  investigate: Search,
  external: ExternalLink,
  filter: ListFilter,
}
