import { getConfig } from '@/services/config'
import type { SettingsForAdmin } from '@/types/settings'
import { getSettingsPublic } from './getSettingsPublic'

/**
 * Returns public settings plus the admin API token, for server-rendered admin
 * pages only. The token is derived from `SECRET_KEY`, never the key itself.
 */
function getSettingsForAdmin(): SettingsForAdmin | null {
  const publicSettings = getSettingsPublic()
  if (!publicSettings) return null
  return {
    ...publicSettings,
    apiToken: getConfig().apiToken || null,
  }
}

export { getSettingsForAdmin }
