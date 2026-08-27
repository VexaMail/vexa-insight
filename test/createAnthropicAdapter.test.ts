import type { AnthropicMessagesRequest } from '@/services/ai'
import { createAnthropicAdapter } from '@/services/ai'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('createAnthropicAdapter', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends temperature to a model that still accepts it', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          content: [{ type: 'text', text: 'ok' }],
          model: 'claude-sonnet-4-6',
          usage: { input_tokens: 1, output_tokens: 1 },
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createAnthropicAdapter('key', 'claude-sonnet-4-6').complete(
      'system',
      'user',
      { timeoutMs: 5_000, maxTokens: 256, temperature: 0.2 },
    )

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as AnthropicMessagesRequest
    expect(request.temperature).toBeCloseTo(0.2)
  })

  // The regression this guards: the Claude 5 models answer `temperature` with
  // HTTP 400, which made them unusable on the metered API key.
  it('omits temperature for a model that rejects it', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          content: [{ type: 'text', text: 'ok' }],
          model: 'claude-opus-5',
          usage: { input_tokens: 1, output_tokens: 1 },
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createAnthropicAdapter('key', 'claude-opus-5').complete(
      'system',
      'user',
      { timeoutMs: 5_000, maxTokens: 256, temperature: 0.2 },
    )

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as AnthropicMessagesRequest
    expect('temperature' in request).toBe(false)
  })
})
