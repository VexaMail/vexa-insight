import { describe, expect, it } from 'vitest'
import { isUpdateAvailable } from '../utils/updates/isUpdateAvailable'

describe('isUpdateAvailable', () => {
  it('returns true when latest is strictly higher', () => {
    expect(isUpdateAvailable('0.1.0', '0.2.0')).toBe(true)
    expect(isUpdateAvailable('1.0.0', '1.0.1')).toBe(true)
    expect(isUpdateAvailable('v1.0.0', 'v2.0.0')).toBe(true)
  })
  it('returns false for equal versions', () => {
    expect(isUpdateAvailable('1.2.3', '1.2.3')).toBe(false)
    expect(isUpdateAvailable('v1.2.3', '1.2.3')).toBe(false)
  })
  it('returns false for downgrades', () => {
    expect(isUpdateAvailable('2.0.0', '1.9.9')).toBe(false)
  })
  it('returns false when either side is null/empty/garbage', () => {
    expect(isUpdateAvailable(null, '1.0.0')).toBe(false)
    expect(isUpdateAvailable('1.0.0', null)).toBe(false)
    expect(isUpdateAvailable('', '1.0.0')).toBe(false)
    expect(isUpdateAvailable('1.0.0', 'abc')).toBe(false)
  })
})
