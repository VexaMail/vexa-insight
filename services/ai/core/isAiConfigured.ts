import { getAiSettings } from '../settings'

/**
 * Returns true if an AI provider and encrypted API key are configured.
 * Synchronous — reads directly from SQLite.
 */
export function isAiConfigured(): boolean {
  const settings = getAiSettings()
  return settings !== null
}
