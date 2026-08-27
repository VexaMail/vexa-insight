import { getAiSettings } from '@/services/ai/settings/getAiSettings'
/**
 * Returns true if an AI provider, encrypted API key, and model are configured.
 *
 * The model is part of the requirement because runtime execution refuses to
 * guess a provider default (`resolveEffectiveModel` throws `NOT_CONFIGURED`),
 * so without it the panels would render an Analyze button that always fails
 * with a 422 instead of the setup prompt.
 *
 * Synchronous — reads directly from SQLite.
 */
export function isAiConfigured(): boolean {
  const settings = getAiSettings()
  if (settings === null) return false
  return (settings.model?.trim().length ?? 0) > 0
}
