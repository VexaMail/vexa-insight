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

  it('uses the singular for one message', () => {
    expect(describeDmarcOutcome({ totalMessages: 1, failingMessages: 0 })).toBe(
      'The only message passes DMARC',
    )
    expect(describeDmarcOutcome({ totalMessages: 1, failingMessages: 1 })).toBe(
      '1 of 1 message fails DMARC',
    )
    expect(
      describeDmarcOutcome({ totalMessages: 340, failingMessages: 1 }),
    ).toBe('1 of 340 messages fails DMARC')
  })

  it('handles a report without messages', () => {
    expect(describeDmarcOutcome({ totalMessages: 0, failingMessages: 0 })).toBe(
      'No messages in this report',
    )
  })
})
