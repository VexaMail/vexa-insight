import { describe, expect, it } from 'vitest'
import { geoipEnrichSchema } from '../src/validators/geoip'

const SAMPLE_IP = '203.0.113.5'

describe('geoipEnrichSchema', () => {
  it('accepts a non-empty ip and forwards it untrimmed', () => {
    expect(geoipEnrichSchema.safeParse({ ip: SAMPLE_IP }).data).toEqual({
      ip: SAMPLE_IP,
    })
    expect(geoipEnrichSchema.safeParse({ ip: ' 203.0.113.5 ' }).data).toEqual({
      ip: ' 203.0.113.5 ',
    })
  })

  it('rejects a missing, blank or non-string ip', () => {
    for (const body of [
      {},
      { ip: '' },
      { ip: '   ' },
      { ip: 5 },
      { ip: null },
    ]) {
      const parsed = geoipEnrichSchema.safeParse(body)
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe('ip must be a valid string')
    }
  })

  it('rejects non-object bodies with the same message', () => {
    for (const body of [null, 'x', 5, []]) {
      const parsed = geoipEnrichSchema.safeParse(body)
      expect(parsed.success).toBe(false)
      expect(parsed.error?.issues[0]?.message).toBe('ip must be a valid string')
    }
  })
})
