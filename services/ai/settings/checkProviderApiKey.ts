import type { AIProviderId } from '@/types/ai'
import { validateProviderApiKey } from '@/validators/ai'

export async function checkProviderApiKey(
  providerId: AIProviderId,
  apiKey: string,
): Promise<boolean> {
  return validateProviderApiKey(providerId, apiKey)
}
