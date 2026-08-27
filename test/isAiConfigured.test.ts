import type { AIProviderSettings } from '@/services/ai'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/ai/settings/getAiSettings', () => ({
  getAiSettings: vi.fn(),
}))

// The first case pays for importing the whole `@/services/ai` barrel, which
// exceeds the 5s default when vitest starts on a cold transform cache — as it
// does under `check:ci`, after type-check and lint. The tests assert behavior,
// not import speed, so the timeout is raised rather than the graph trimmed.
vi.setConfig({ testTimeout: 30_000 })

describe('isAiConfigured', () => {
  const settingsWithModel = (model: string | null): AIProviderSettings => ({
    providerId: 'openai',
    apiKeyEncrypted: 'ciphertext',
    apiKeyIv: 'iv',
    model,
    updatedAt: new Date('2026-07-25T00:00:00Z'),
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns false when no provider is configured', async () => {
    const { getAiSettings, isAiConfigured } = await import('@/services/ai')
    vi.mocked(getAiSettings).mockReturnValue(null)
    expect(isAiConfigured()).toBe(false)
  })

  it('returns false when the provider and key are saved without a model', async () => {
    const { getAiSettings, isAiConfigured } = await import('@/services/ai')
    for (const model of [null, '', '   ']) {
      vi.mocked(getAiSettings).mockReturnValue(settingsWithModel(model))
      expect(isAiConfigured()).toBe(false)
    }
  })

  it('returns true once a model is selected', async () => {
    const { getAiSettings, isAiConfigured } = await import('@/services/ai')
    vi.mocked(getAiSettings).mockReturnValue(settingsWithModel('gpt-5.5'))
    expect(isAiConfigured()).toBe(true)
  })
})
