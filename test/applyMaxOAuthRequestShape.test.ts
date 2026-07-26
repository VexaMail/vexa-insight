import type { AnthropicMessagesRequest } from '@/services/ai'
import { applyMaxOAuthRequestShape, CLAUDE_CODE_IDENTITY } from '@/services/ai'
import { describe, expect, it } from 'vitest'

describe('applyMaxOAuthRequestShape', () => {
  const baseRequest: AnthropicMessagesRequest = {
    model: 'claude-sonnet-5',
    max_tokens: 128,
    system: 'You are a DMARC analyst.',
    messages: [{ role: 'user', content: 'Analyze this.' }],
    temperature: 0.2,
  }

  it('puts the Claude Code identity first and keeps the prompt after it', () => {
    const shaped = applyMaxOAuthRequestShape(baseRequest)
    expect(shaped.system).toEqual([
      { type: 'text', text: CLAUDE_CODE_IDENTITY },
      { type: 'text', text: 'You are a DMARC analyst.' },
    ])
  })

  it('preserves an existing block array after the identity', () => {
    const shaped = applyMaxOAuthRequestShape({
      ...baseRequest,
      system: [
        { type: 'text', text: 'first' },
        { type: 'text', text: 'second' },
      ],
    })
    expect(shaped.system).toEqual([
      { type: 'text', text: CLAUDE_CODE_IDENTITY },
      { type: 'text', text: 'first' },
      { type: 'text', text: 'second' },
    ])
  })

  // The lane serves Claude 5 models, which 400 on `temperature` and reject a
  // forced shape while thinking is on.
  it('drops temperature and disables thinking', () => {
    const shaped = applyMaxOAuthRequestShape(baseRequest)
    expect(shaped.temperature).toBeUndefined()
    expect('temperature' in shaped).toBe(false)
    expect(shaped.thinking).toEqual({ type: 'disabled' })
  })

  it('leaves the model, token budget and messages untouched', () => {
    const shaped = applyMaxOAuthRequestShape(baseRequest)
    expect(shaped.model).toBe('claude-sonnet-5')
    expect(shaped.max_tokens).toBe(128)
    expect(shaped.messages).toEqual(baseRequest.messages)
  })
})
