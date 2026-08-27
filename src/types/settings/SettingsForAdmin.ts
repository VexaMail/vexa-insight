import type { SettingsPublic } from './SettingsPublic'
/**
 * Settings shape for admin-only server rendering (includes secret key).
 * Only used when rendering the Settings page; never exposed via public API.
 */
export type SettingsForAdmin = {
  secretKey: string | null
} & SettingsPublic
