import { appSettings, getDb } from '@/lib/db'
import type { AIProviderId, AIProviderSettingsPublic } from '@/types/ai'
import { eq } from 'drizzle-orm'

/**
 * Returns AI provider settings for the client with the API key masked.
 */
export function getAiSettingsPublic(): AIProviderSettingsPublic {
  const db = getDb()
  const row = db
    .select({
      aiProviderId: appSettings.aiProviderId,
      aiApiKeyEncrypted: appSettings.aiApiKeyEncrypted,
      aiModel: appSettings.aiModel,
    })
    .from(appSettings)
    .where(eq(appSettings.id, 1))
    .limit(1)
    .get()

  if (!row?.aiProviderId || !row.aiApiKeyEncrypted) {
    return {
      providerId: null,
      apiKeyMasked: null,
      model: null,
      isConfigured: false,
    }
  }

  return {
    providerId: row.aiProviderId as AIProviderId,
    apiKeyMasked: '••••••••',
    model: row.aiModel ?? null,
    isConfigured: true,
  }
}
