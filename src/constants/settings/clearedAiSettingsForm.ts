import type { AiSettingsFormState } from '@/types/settings'

/** Empty AI settings form: no provider, no key, no model. */
export const CLEARED_AI_SETTINGS_FORM: AiSettingsFormState = {
  providerId: null,
  apiKey: '',
  model: '',
}
