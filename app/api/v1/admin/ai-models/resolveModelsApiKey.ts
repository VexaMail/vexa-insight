import { resolveStoredApiKey } from '@/services/ai'

/** The key typed into the form, or the saved one when the form left it blank. */
export function resolveModelsApiKey(provided: string | undefined): string {
  return (provided?.trim() ?? '') || resolveStoredApiKey()
}
