import type { AIProviderSettingsPublic } from '@/types/ai'

/** Outcome of writing the AI provider settings. */
export type AiSettingsSaveResult =
  | { ok: true; data: AIProviderSettingsPublic | null }
  | { ok: false; message: string }
