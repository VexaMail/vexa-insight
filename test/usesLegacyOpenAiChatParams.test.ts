import { usesLegacyOpenAiChatParams } from '@/utils/ai'
import { describe, expect, it } from 'vitest'

describe('usesLegacyOpenAiChatParams', () => {
  it.each([
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4.1',
    'gpt-4-turbo',
    'gpt-3.5-turbo',
    'chatgpt-4o-latest',
  ])('reports %s as taking the legacy parameters', (model) => {
    expect(usesLegacyOpenAiChatParams(model)).toBe(true)
  })

  // The reasoning families reject both halves: a non-default temperature
  // ("Only the default (1) value is supported.") and `max_tokens`, which has
  // to be `max_completion_tokens` there.
  it.each(['o1', 'o1-mini', 'o3', 'o4-mini', 'gpt-5', 'gpt-5-chat-latest'])(
    'reports %s as taking the reasoning parameters',
    (model) => {
      expect(usesLegacyOpenAiChatParams(model)).toBe(false)
    },
  )

  it('treats an unknown model as taking the reasoning parameters', () => {
    expect(usesLegacyOpenAiChatParams('some-future-model')).toBe(false)
  })

  it('ignores surrounding whitespace and casing', () => {
    expect(usesLegacyOpenAiChatParams('  GPT-4o ')).toBe(true)
  })
})
