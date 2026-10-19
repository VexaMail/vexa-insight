import { describeDmarcOutcome } from '@/utils/reports'
import { describe, expect, it } from 'vitest'

const outcome = (
  totalMessages: number,
  failingMessages: number,
  partiallyAlignedMessages: number,
) => ({ totalMessages, failingMessages, partiallyAlignedMessages })

describe('describeDmarcOutcome', () => {
  it('says every message is fully aligned when none fail or align partially', () => {
    expect(describeDmarcOutcome(outcome(1200, 0, 0))).toBe(
      'All 1,200 messages align on SPF and DKIM',
    )
    expect(describeDmarcOutcome(outcome(1, 0, 0))).toBe(
      'The only message aligns on SPF and DKIM',
    )
  })

  it('names messages that pass DMARC on SPF or DKIM only', () => {
    expect(describeDmarcOutcome(outcome(9, 0, 9))).toBe(
      'All 9 messages pass DMARC, but 9 align on SPF or DKIM only',
    )
    expect(describeDmarcOutcome(outcome(9, 0, 1))).toBe(
      'All 9 messages pass DMARC, but 1 aligns on SPF or DKIM only',
    )
    expect(describeDmarcOutcome(outcome(1, 0, 1))).toBe(
      'The only message passes DMARC, but aligns on SPF or DKIM only',
    )
  })

  it('gives the failing share when some fail', () => {
    expect(describeDmarcOutcome(outcome(340, 12, 0))).toBe(
      '12 of 340 messages fail DMARC',
    )
    expect(describeDmarcOutcome(outcome(1, 1, 0))).toBe(
      '1 of 1 message fails DMARC',
    )
    expect(describeDmarcOutcome(outcome(340, 1, 5))).toBe(
      '1 of 340 messages fails DMARC',
    )
  })

  it('handles a report without messages', () => {
    expect(describeDmarcOutcome(outcome(0, 0, 0))).toBe(
      'No messages in this report',
    )
  })
})
