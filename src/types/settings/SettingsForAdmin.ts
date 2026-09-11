import type { SettingsPublic } from './SettingsPublic'
/**
 * Settings shape for admin-only server rendering. Carries the admin API token,
 * which is derived from `SECRET_KEY` rather than being it, so rendering it into
 * the page does not put the encryption root in a browser. Only used when
 * rendering the Settings page; never exposed via public API.
 */
export type SettingsForAdmin = {
  apiToken: string | null
} & SettingsPublic
