import type { DomainDetailTabDef } from '@/types/domains'
import { FileText, History, Lock, Network, Server } from 'lucide-react'

/** The tabs of the domain page, in order. */
export const DOMAIN_DETAIL_TABS: readonly DomainDetailTabDef[] = [
  { key: 'sources', label: 'Sources', icon: Server },
  { key: 'dns', label: 'DNS', icon: Network },
  { key: 'reports', label: 'Reports', icon: FileText },
  { key: 'history', label: 'History', icon: History },
  { key: 'transport', label: 'TLS / RUF', icon: Lock },
]
