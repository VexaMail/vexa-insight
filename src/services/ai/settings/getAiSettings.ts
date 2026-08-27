import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { AIProviderSettings } from '../contracts'

/**
 * Reads AI provider settings from the database.
 * Returns null if no AI provider is configured.
 */
export function getAiSettings(): AIProviderSettings | null {
  const db = getDb()
  const row = db
    .select({
      aiProviderId: appSettings.aiProviderId,
      aiApiKeyEncrypted: appSettings.aiApiKeyEncrypted,
      aiApiKeyIv: appSettings.aiApiKeyIv,
      aiModel: appSettings.aiModel,
      updatedAt: appSettings.updatedAt,
    })
    .from(appSettings)
    .where(eq(appSettings.id, 1))
    .limit(1)
    .get()

  if (!row?.aiProviderId || !row.aiApiKeyEncrypted || !row.aiApiKeyIv) {
    return null
  }

  return {
    providerId: row.aiProviderId as AIProviderSettings['providerId'],
    apiKeyEncrypted: row.aiApiKeyEncrypted,
    apiKeyIv: row.aiApiKeyIv,
    model: row.aiModel ?? null,
    updatedAt: row.updatedAt,
  }
}
