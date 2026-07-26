import { supportsAnthropicTemperature } from '@/utils/ai'
import { describe, expect, it } from 'vitest'

describe('supportsAnthropicTemperature', () => {
  it.each([
    'claude-sonnet-4-6',
    'claude-opus-4-6',
    'claude-haiku-4-5',
    'claude-sonnet-4-5-20250929',
    'claude-3-5-sonnet-20241022',
  ])('accepts %s', (model) => {
    expect(supportsAnthropicTemperature(model)).toBe(true)
  })

  // Opus 4.7 is where Anthropic removed the sampling parameters; everything
  // released after it answers HTTP 400 when `temperature` is present.
  it.each([
    'claude-opus-4-7',
    'claude-opus-4-8',
    'claude-opus-5',
    'claude-sonnet-5',
    'claude-fable-5',
  ])('rejects %s', (model) => {
    expect(supportsAnthropicTemperature(model)).toBe(false)
  })

  // An unrecognised id is far more likely to be a model newer than this list
  // than an older one, so the safe default is to drop the field.
  it('treats an unknown model as not accepting it', () => {
    expect(supportsAnthropicTemperature('some-future-model')).toBe(false)
  })

  it('ignores surrounding whitespace and casing', () => {
    expect(supportsAnthropicTemperature('  Claude-Sonnet-4-6 ')).toBe(true)
  })
})
