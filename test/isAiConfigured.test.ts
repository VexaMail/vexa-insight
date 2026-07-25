import type { AIProviderSettings } from '@/services/ai'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/services/ai/settings', () => ({
  getAiSettings: vi.fn(),
}))

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
