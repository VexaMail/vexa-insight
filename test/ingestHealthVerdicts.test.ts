import {
  computeNextScheduledRun,
  freshnessVerdict,
  mailboxesVerdict,
  overallIngestVerdict,
  processingVerdict,
  schedulerVerdict,
} from '@/utils/ingest'
import { describe, expect, it } from 'vitest'

const at = (iso: string) => new Date(iso)

const runs = {
  lastRunAt: at('2026-10-19T03:00:00'),
  lastRunSuccess: true,
  lastProcessed: 3,
  lastIngested: 3,
  lastErrorCount: 0,
  lastErrorSummary: null,
  lastSuccessAt: at('2026-10-19T03:00:00'),
  failedRuns24h: 0,
  runs24h: 24,
}

describe('computeNextScheduledRun', () => {
  it('lands on the next multiple of the interval within the hour', () => {
    const next = computeNextScheduledRun(at('2026-10-19T03:07:30'), 15)
    expect([next.getHours(), next.getMinutes(), next.getSeconds()]).toEqual([
      3, 15, 0,
    ])
  })

  it('fires at minute 0 for an hourly interval, never at the current minute', () => {
    const next = computeNextScheduledRun(at('2026-10-19T03:00:10'), 60)
    expect([next.getHours(), next.getMinutes()]).toEqual([4, 0])
  })
})

describe('ingest health verdicts', () => {
  it('does not read an idle scheduler as healthy', () => {
    expect(schedulerVerdict({ scheduler: 'idle', isRunning: false }).tone).toBe(
      'unknown',
    )
    expect(
      schedulerVerdict({ scheduler: 'stale', isRunning: false }).tone,
    ).toBe('danger')
  })

  it('fails a mailbox whose newest event is an error', () => {
    const verdict = mailboxesVerdict([
      {
        id: 1,
        name: 'reports@example.com',
        lastSuccessAt: at('2026-10-18T10:00:00'),
        lastErrorAt: at('2026-10-19T02:00:00'),
        lastError: 'AUTHENTICATIONFAILED',
      },
    ])
    expect(verdict).toEqual({ tone: 'danger', label: '1 of 1 failing' })
  })

  it('warns when a run of the last day failed even if the last one passed', () => {
    expect(processingVerdict({ ...runs, failedRuns24h: 2 }).tone).toBe(
      'warning',
    )
    expect(processingVerdict(runs).tone).toBe('success')
  })

  it('flags data that stopped arriving', () => {
    const now = at('2026-10-19T04:00:00')
    const stale = {
      lastIngestedAt: at('2026-10-16T04:00:00'),
      lastPeriodEnd: null,
    }
    expect(freshnessVerdict(stale, now).tone).toBe('warning')
  })

  it('lets the worst dimension decide the overall state', () => {
    const ok = { tone: 'success', label: '' } as const
    const bad = { tone: 'danger', label: '' } as const
    expect(overallIngestVerdict([ok, ok, bad, ok]).tone).toBe('danger')
    expect(overallIngestVerdict([ok, ok, ok, ok]).tone).toBe('success')
    expect(
      overallIngestVerdict([
        { tone: 'unknown', label: '' },
        { tone: 'unknown', label: '' },
      ]).label,
    ).toBe('Not configured')
  })
})
