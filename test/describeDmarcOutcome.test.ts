import { describeDmarcOutcome } from '@/utils/reports'
import { describe, expect, it } from 'vitest'

describe('describeDmarcOutcome', () => {
  it('says every message passes when none fail', () => {
    expect(
      describeDmarcOutcome({ totalMessages: 1200, failingMessages: 0 }),
    ).toBe('All 1,200 messages pass DMARC')
  })

  it('gives the failing share when some fail', () => {
    expect(
      describeDmarcOutcome({ totalMessages: 340, failingMessages: 12 }),
    ).toBe('12 of 340 messages fail DMARC')
  })

  it('handles a report without messages', () => {
    expect(describeDmarcOutcome({ totalMessages: 0, failingMessages: 0 })).toBe(
      'No messages in this report',
    )
  })
})
