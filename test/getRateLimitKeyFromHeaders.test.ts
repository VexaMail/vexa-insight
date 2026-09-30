import { describe, expect, it } from 'vitest'
import { getRateLimitKeyFromHeaders } from '../src/utils/rateLimit/getRateLimitKeyFromHeaders'

describe('getRateLimitKeyFromHeaders', () => {
  it('cannot be moved to a fresh bucket by a forged X-Forwarded-For', () => {
    const first = new Headers({
      'x-forwarded-for': '203.0.113.1, 198.51.100.7',
    })
    const second = new Headers({
      'x-forwarded-for': '203.0.113.2, 198.51.100.7',
    })
    expect(getRateLimitKeyFromHeaders(first)).toBe('ip:198.51.100.7')
    expect(getRateLimitKeyFromHeaders(second)).toBe(
      getRateLimitKeyFromHeaders(first),
    )
  })
})
