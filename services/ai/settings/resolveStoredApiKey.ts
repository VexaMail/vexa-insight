import { decryptApiKey } from '@/services/ai/settings/decryptApiKey'
import { getAiSettings } from '@/services/ai/settings/getAiSettings'
import { getConfig } from '@/services/config'

/**
 * Reads and decrypts the API key stored in the database.
 * Returns empty string if no key is stored.
 */
export function resolveStoredApiKey(): string {
  const settings = getAiSettings()
  if (!settings) return ''

  const config = getConfig()
  return (
    decryptApiKey(
      settings.apiKeyEncrypted,
      settings.apiKeyIv,
      config.secretKey,
    ) ?? ''
  )
}
