import { getConfig } from '@/services/config'
import { decryptApiKey } from './decryptApiKey'
import { getAiSettings } from './getAiSettings'

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
