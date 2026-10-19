import type { NavGroup } from '@/types/shell'
import {
  Activity,
  FileText,
  Globe,
  LayoutDashboard,
  Network,
  RefreshCw,
  Settings,
  Upload,
  Users,
} from 'lucide-react'

/**
 * Sidebar order follows the operator's loop: watch what needs attention,
 * investigate the cause, then administer the instance.
 */
export const navGroups: readonly NavGroup[] = [
  {
    label: 'Operate',
    items: [
      { title: 'Overview', url: '/', icon: LayoutDashboard },
      { title: 'Domains', url: '/domains', icon: Globe },
      { title: 'Sending sources', url: '/ips', icon: Network },
    ],
  },
  {
    label: 'Investigate',
    items: [
      { title: 'Diagnostics', url: '/diagnostics', icon: Activity },
      { title: 'Reports', url: '/reports', icon: FileText },
      { title: 'Ingestion', url: '/ingest', icon: RefreshCw },
      { title: 'Upload', url: '/upload', icon: Upload },
    ],
  },
  {
    label: 'Admin',
    items: [
      { title: 'Users', url: '/users', icon: Users },
      { title: 'Settings', url: '/settings', icon: Settings },
    ],
  },
]
