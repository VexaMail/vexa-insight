import type { NavGroup } from '@/types/shell'
import {
  Activity,
  FileText,
  Globe,
  LayoutDashboard,
  Network,
  RefreshCw,
  Settings,
  TriangleAlert,
  Upload,
  Users,
} from 'lucide-react'

/**
 * Sidebar order follows the operator's loop: what needs attention first, then
 * the objects to investigate, then the pipeline. Admin sits at the bottom.
 */
export const navGroups: readonly NavGroup[] = [
  {
    label: 'Operate',
    placement: 'main',
    items: [
      { title: 'Overview', url: '/', icon: LayoutDashboard },
      { title: 'Issues', url: '/issues', icon: TriangleAlert },
      { title: 'Domains', url: '/domains', icon: Globe },
      { title: 'Sending sources', url: '/ips', icon: Network },
      { title: 'Diagnostics', url: '/diagnostics', icon: Activity },
      { title: 'Reports', url: '/reports', icon: FileText },
      { title: 'Ingestion', url: '/ingest', icon: RefreshCw },
      { title: 'Upload', url: '/upload', icon: Upload },
    ],
  },
  {
    label: 'Admin',
    placement: 'footer',
    items: [
      { title: 'Users', url: '/users', icon: Users },
      { title: 'Settings', url: '/settings', icon: Settings },
    ],
  },
]
