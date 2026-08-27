import { describe, expect, it } from 'vitest'
import { normalizeDkimAuthResult } from '../src/utils/dmarc/normalizeDkimAuthResult'
import { normalizeDkimResults } from '../src/utils/dmarc/normalizeDkimResults'
import { normalizePolicyOverrides } from '../src/utils/dmarc/normalizePolicyOverrides'
import { normalizePolicyOverrideType } from '../src/utils/dmarc/normalizePolicyOverrideType'
import { normalizeSpfAuthResult } from '../src/utils/dmarc/normalizeSpfAuthResult'

describe('normalizeSpfAuthResult', () => {
  it('maps standard values', () => {
    expect(normalizeSpfAuthResult('pass')).toBe('pass')
    expect(normalizeSpfAuthResult('fail')).toBe('fail')
    expect(normalizeSpfAuthResult('softfail')).toBe('softfail')
  })
  it('coerces alternative spacings to standard enum', () => {
    expect(normalizeSpfAuthResult('perm_error')).toBe('permerror')
    expect(normalizeSpfAuthResult('temp_error')).toBe('temperror')
    expect(normalizeSpfAuthResult(' Temperror ')).toBe('temperror')
  })
  it('falls back to none for unknown values', () => {
    expect(normalizeSpfAuthResult('weird')).toBe('none')
    expect(normalizeSpfAuthResult(null)).toBe('none')
  })
})

describe('normalizeDkimAuthResult', () => {
  it('maps standard values', () => {
    expect(normalizeDkimAuthResult('pass')).toBe('pass')
    expect(normalizeDkimAuthResult('fail')).toBe('fail')
  })
  it('falls back to none for unknown values', () => {
    expect(normalizeDkimAuthResult('weird')).toBe('none')
    expect(normalizeDkimAuthResult(null)).toBe('none')
    expect(normalizeDkimAuthResult(undefined)).toBe('none')
  })
})

describe('normalizePolicyOverrideType', () => {
  it('maps known types', () => {
    expect(normalizePolicyOverrideType('forwarded')).toBe('forwarded')
    expect(normalizePolicyOverrideType('local_policy')).toBe('local_policy')
  })
  it('falls back to other for unknown types', () => {
    expect(normalizePolicyOverrideType('weird')).toBe('other')
    expect(normalizePolicyOverrideType(null)).toBe('other')
  })
})

describe('normalizeDkimResults', () => {
  it('handles empty results', () => {
    expect(normalizeDkimResults(null, 'example.com')).toEqual([])
  })
  it('handles object correctly (single DKIM signature)', () => {
    const raw = { domain: 'example.com', selector: 's1', result: 'pass' }
    const res = normalizeDkimResults(raw, 'example.com')
    expect(res).toBeInstanceOf(Array)
    expect(res).toHaveLength(1)
    const first = res[0]
    expect(first).toBeDefined()
    if (first) {
      expect(first).toEqual({
        domain: 'example.com',
        selector: 's1',
        result: 'pass',
        isAligned: true,
      })
    }
  })
  it('handles arrays correctly (multiple DKIM signatures)', () => {
    const raw = [
      { domain: 'example.com', selector: 's1', result: 'pass' },
      { domain: 'other.com', selector: 's2', result: 'fail' },
    ]
    const res = normalizeDkimResults(raw, 'example.com')
    expect(res).toHaveLength(2)
    const first = res[0]
    const second = res[1]
    if (first && second) {
      expect(first.isAligned).toBe(true)
      expect(second.isAligned).toBe(false)
    }
  })
})

describe('normalizePolicyOverrides', () => {
  it('handles empty results', () => {
    expect(normalizePolicyOverrides(null)).toEqual([])
  })
  it('handles object correctly', () => {
    const raw = { type: 'forwarded', comment: 'trusted' }
    const res = normalizePolicyOverrides(raw)
    expect(res).toHaveLength(1)
    const first = res[0]
    if (first) {
      expect(first).toEqual({ type: 'forwarded', comment: 'trusted' })
    }
  })
  it('handles arrays correctly', () => {
    const raw = [
      { type: 'forwarded', comment: 'A' },
      { type: 'local_policy', comment: 'B' },
      { type: 'unknown_type', comment: 'C' },
    ]
    const res = normalizePolicyOverrides(raw)
    expect(res).toHaveLength(3)
    const first = res[0]
    const second = res[1]
    const third = res[2]
    if (first && second && third) {
      expect(first.type).toBe('forwarded')
      expect(second.type).toBe('local_policy')
      expect(third.type).toBe('other') // normalized
    }
  })
})
