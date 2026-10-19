import type { SettingsSectionLink } from '@/types/settings'
import {
  BellRing,
  CheckCircle2,
  Clock,
  Database,
  Globe,
  Key,
  Mail,
  MailCheck,
  PanelsTopLeft,
  Server,
  Sparkles,
  Webhook,
} from 'lucide-react'

/** The settings page's sections, in page order, for the section index. */
export const SETTINGS_SECTION_LINKS: readonly SettingsSectionLink[] = [
  { id: 'general', label: 'General', icon: PanelsTopLeft, group: 'Collection' },
  { id: 'mailboxes', label: 'Mailboxes', icon: Mail, group: 'Collection' },
  { id: 'ingestion', label: 'Ingestion', icon: Clock, group: 'Collection' },
  {
    id: 'ip-hostname',
    label: 'IP hostname lookup',
    icon: Globe,
    group: 'Enrichment',
  },
  { id: 'geoip', label: 'GeoIP', icon: Database, group: 'Enrichment' },
  { id: 'snds', label: 'SNDS', icon: MailCheck, group: 'Enrichment' },
  { id: 'ai', label: 'AI provider', icon: Sparkles, group: 'Enrichment' },
  { id: 'api-key', label: 'API key', icon: Key, group: 'Instance' },
  { id: 'updates', label: 'Updates', icon: CheckCircle2, group: 'Instance' },
  { id: 'advanced', label: 'Advanced', icon: Server, group: 'Instance' },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook, group: 'Notifications' },
  {
    id: 'alert-rules',
    label: 'Alert rules',
    icon: BellRing,
    group: 'Notifications',
  },
]
