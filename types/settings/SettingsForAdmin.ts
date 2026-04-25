import type { SettingsPublic } from '@/types/settings'

/**
 * Settings shape for admin-only server rendering (includes secret key).
 * Only used when rendering the Settings page; never exposed via public API.
 */
export type SettingsForAdmin = {
  secretKey: string | null
} & SettingsPublic
