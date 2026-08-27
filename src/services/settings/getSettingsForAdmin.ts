import { getSettingsRow } from '@/services/settings-store'
import type { SettingsForAdmin } from '@/types/settings'
import { getSettingsPublic } from './getSettingsPublic'

/**
 * Returns public settings plus the API key for server-rendered admin pages only.
 * Do not use in API route handlers; the key would be exposed to the client.
 */
function getSettingsForAdmin(): SettingsForAdmin | null {
  const publicSettings = getSettingsPublic()
  if (!publicSettings) return null
  const row = getSettingsRow()
  return {
    ...publicSettings,
    secretKey: row?.secretKey ?? null,
  }
}

export { getSettingsForAdmin }
