import {
  Activity,
  FileText,
  Globe,
  LayoutDashboard,
  Network,
  RefreshCw,
  Upload,
} from 'lucide-react'

export const topNavItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Diagnostics', url: '/diagnostics', icon: Activity },
  { title: 'Domains', url: '/domains', icon: Globe },
  { title: 'IPs', url: '/ips', icon: Network },
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'Upload', url: '/upload', icon: Upload },
  { title: 'Ingest', url: '/ingest', icon: RefreshCw },
]
