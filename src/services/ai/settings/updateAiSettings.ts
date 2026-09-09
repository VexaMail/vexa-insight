import { appSettings, getDb } from '@/lib/db'
import { eq } from 'drizzle-orm'
import type { AIProviderId } from '../contracts'
import { encryptApiKey } from './encryptApiKey'

/**
 * Writes AI provider settings to the database.
 * Encrypts the API key before storage.
 * Pass null for providerId to clear AI configuration.
 */
export function updateAiSettings(
  providerId: AIProviderId | null,
  apiKey: string | null,
  secretKey: string,
  model?: string | null,
): void {
  const db = getDb()

  if (!providerId) {
    db.update(appSettings)
      .set({
        aiProviderId: null,
        aiApiKeyEncrypted: null,
        aiApiKeyIv: null,
        aiModel: null,
        updatedAt: new Date(),
      })
      .where(eq(appSettings.id, 1))
      .run()
    return
  }

  const updates: Record<string, unknown> = {
    aiProviderId: providerId,
    aiModel: model ?? null,
    updatedAt: new Date(),
  }

  if (apiKey && apiKey.trim() !== '') {
    const { encrypted, iv } = encryptApiKey(apiKey, secretKey)
    updates['aiApiKeyEncrypted'] = encrypted
    updates['aiApiKeyIv'] = iv
  }

  db.update(appSettings).set(updates).where(eq(appSettings.id, 1)).run()
}
