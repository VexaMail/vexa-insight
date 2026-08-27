import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { isUpdateCheckEnabledFromEnv } from '../src/utils/updates/isUpdateCheckEnabledFromEnv'

describe('isUpdateCheckEnabledFromEnv', () => {
  let original: string | undefined

  beforeEach(() => {
    original = process.env.VEXA_UPDATE_CHECK_ENABLED
  })
  afterEach(() => {
    if (original === undefined) delete process.env.VEXA_UPDATE_CHECK_ENABLED
    else process.env.VEXA_UPDATE_CHECK_ENABLED = original
  })

  it('defaults to true when unset', () => {
    delete process.env.VEXA_UPDATE_CHECK_ENABLED
    expect(isUpdateCheckEnabledFromEnv()).toBe(true)
  })
  it('returns false for explicit off-like values', () => {
    for (const value of ['false', '0', 'no', 'off', 'FALSE', ' Off ']) {
      process.env.VEXA_UPDATE_CHECK_ENABLED = value
      expect(isUpdateCheckEnabledFromEnv()).toBe(false)
    }
  })
  it('returns true for truthy or unrelated values', () => {
    for (const value of ['true', '1', 'yes', 'on', '']) {
      process.env.VEXA_UPDATE_CHECK_ENABLED = value
      expect(isUpdateCheckEnabledFromEnv()).toBe(true)
    }
  })
})
