import { createGeminiAdapter } from '@/services/ai'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('createGeminiAdapter', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends temperature to a Gemini 2.x model', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          candidates: [{ content: { parts: [{ text: '{}' }] } }],
          modelVersion: 'test',
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createGeminiAdapter('key', 'gemini-2.5-flash').complete(
      'system',
      'user',
      { timeoutMs: 5_000, maxTokens: 256, temperature: 0.2 },
    )

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as {
      generationConfig: Record<string, unknown>
    }
    expect(request.generationConfig['temperature']).toBeCloseTo(0.2)
  })

  // Gemini 3 accepts the field but documents that overriding the default 1.0
  // can loop or degrade reasoning output, so the adapter omits it and lets
  // the provider default apply.
  it('omits temperature for a Gemini 3.x model', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          candidates: [{ content: { parts: [{ text: '{}' }] } }],
          modelVersion: 'test',
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createGeminiAdapter('key', 'gemini-3.7-flash').complete(
      'system',
      'user',
      { timeoutMs: 5_000, maxTokens: 256, temperature: 0.2 },
    )

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as {
      generationConfig: Record<string, unknown>
    }
    expect('temperature' in request.generationConfig).toBe(false)
    expect(request.generationConfig['maxOutputTokens']).toBe(256)
  })
})
