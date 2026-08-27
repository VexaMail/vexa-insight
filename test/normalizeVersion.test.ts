import { describe, expect, it } from 'vitest'
import { normalizeVersion } from '../src/utils/updates/normalizeVersion'

describe('normalizeVersion', () => {
  it('strips a leading v', () => {
    expect(normalizeVersion('v1.2.3')).toBe('1.2.3')
  })
  it('returns plain semver as-is', () => {
    expect(normalizeVersion('0.1.0')).toBe('0.1.0')
  })
  it('coerces partial inputs to a full semver', () => {
    expect(normalizeVersion('1.2')).toBe('1.2.0')
    expect(normalizeVersion('1')).toBe('1.0.0')
  })
  it('returns null for null, undefined, empty, or garbage', () => {
    expect(normalizeVersion(null)).toBeNull()
    expect(normalizeVersion(undefined)).toBeNull()
    expect(normalizeVersion('')).toBeNull()
    expect(normalizeVersion('   ')).toBeNull()
    expect(normalizeVersion('not-a-version')).toBeNull()
  })
})
