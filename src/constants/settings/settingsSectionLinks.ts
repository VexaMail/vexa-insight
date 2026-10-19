import type { SettingsSectionLink } from '@/types/settings'

/** The settings page's sections, in page order, for the section index. */
export const SETTINGS_SECTION_LINKS: readonly SettingsSectionLink[] = [
  { id: 'general', label: 'General' },
  { id: 'mailboxes', label: 'Mailboxes' },
  { id: 'ingestion', label: 'Ingestion' },
  { id: 'ip-hostname', label: 'IP hostname lookup' },
  { id: 'geoip', label: 'GeoIP' },
  { id: 'snds', label: 'SNDS' },
  { id: 'ai', label: 'AI provider' },
  { id: 'api-key', label: 'API key' },
  { id: 'updates', label: 'Updates' },
  { id: 'advanced', label: 'Advanced' },
]
