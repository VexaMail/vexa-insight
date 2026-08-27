import { describe, expect, it } from 'vitest'
import type { AIServiceError } from '../src/services/ai/contracts'
import { resolveEffectiveModel } from '../src/services/ai/providers/shared/resolveEffectiveModel'

describe('resolveEffectiveModel', () => {
  it('returns the selected model when set', () => {
    expect(resolveEffectiveModel('openrouter', 'openai/gpt-4o')).toBe(
      'openai/gpt-4o',
    )
  })

  it('trims surrounding whitespace from the selected model', () => {
    expect(resolveEffectiveModel('anthropic', '  claude-sonnet-4-6  ')).toBe(
      'claude-sonnet-4-6',
    )
  })

  it.each([null, undefined, '', '   '])(
    'throws NOT_CONFIGURED when the model is %j',
    (selectedModel) => {
      let thrown: unknown
      try {
        resolveEffectiveModel('openrouter', selectedModel)
      } catch (err: unknown) {
        thrown = err
      }

      const error = thrown as AIServiceError
      expect(error).toBeDefined()
      expect(error.code).toBe('NOT_CONFIGURED')
      expect(error.message).toContain('openrouter')
      expect(error.message).toContain('Settings')
    },
  )

  it('never falls back to openrouter/auto', () => {
    let thrown: unknown
    try {
      resolveEffectiveModel('openrouter', null)
    } catch (err: unknown) {
      thrown = err
    }
    expect(thrown).toBeDefined()
    expect((thrown as AIServiceError).message).not.toContain('openrouter/auto')
  })
})
