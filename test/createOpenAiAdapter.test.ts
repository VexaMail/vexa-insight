import { createOpenAiAdapter } from '@/services/ai'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('createOpenAiAdapter', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sends max_tokens and temperature to a pre-reasoning model', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          choices: [{ message: { content: '{}' } }],
          model: 'gpt-4o',
          usage: { total_tokens: 2 },
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createOpenAiAdapter('key', 'gpt-4o').complete('system', 'user', {
      timeoutMs: 5_000,
      maxTokens: 256,
      temperature: 0.2,
    })

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as Record<string, unknown>
    expect(request.max_tokens).toBe(256)
    expect(request.temperature).toBeCloseTo(0.2)
    expect(request.response_format).toEqual({ type: 'json_object' })
    expect('max_completion_tokens' in request).toBe(false)
  })

  // A reasoning model rejects sampling parameters and JSON mode with HTTP
  // 400 on chat completions, so all of them have to change together or the
  // model stays unusable.
  it('sends max_completion_tokens and no temperature or JSON mode to a reasoning model', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
        Promise.resolve({
          choices: [{ message: { content: '{}' } }],
          model: 'gpt-5',
          usage: { total_tokens: 2 },
        }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await createOpenAiAdapter('key', 'gpt-5').complete('system', 'user', {
      timeoutMs: 5_000,
      maxTokens: 256,
      temperature: 0.2,
    })

    const [, init] = fetchMock.mock.calls[0] as [string, { body: string }]
    const request = JSON.parse(init.body) as Record<string, unknown>
    expect(request.max_completion_tokens).toBe(256)
    expect('max_tokens' in request).toBe(false)
    expect('temperature' in request).toBe(false)
    expect('response_format' in request).toBe(false)
  })
})
