import type * as ForensicConstants from '@/constants/forensic'
import { forensicReports, getDb, runMigrations } from '@/lib/db'
import {
  getForensicReportsForDomain,
  ingestForensicReport,
} from '@/services/forensic'
import type { ForensicReport } from '@/types/forensic'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/constants/forensic', async (importOriginal) => ({
  ...(await importOriginal<typeof ForensicConstants>()),
  FORENSIC_DAILY_CAP_PER_DOMAIN: 2,
}))

const DAY = Date.parse('2026-09-11T00:00:00Z') / 1000

function report(id: string, arrivalDate = DAY + 3600): ForensicReport {
  return {
    reportedDomain: 'example.com',
    feedbackType: 'auth-failure',
    authFailure: 'dmarc',
    sourceIp: '192.0.2.10',
    reportingMta: 'receiver.example',
    arrivalDate,
    headerFromDomain: 'example.com',
    envelopeFromDomain: 'lists.example.net',
    dkimDomain: 'example.com',
    dkimSelector: 'default',
    spfResult: null,
    dkimResult: null,
    dmarcResult: 'fail',
    originalMessageId: null,
    listId: null,
    sourceMessageId: id,
  }
}

describe('ingestForensicReport', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    getDb().delete(forensicReports).run()
  })

  it('stores a report mail once', () => {
    expect(ingestForensicReport(report('<a@receiver.example>')).ingested).toBe(
      true,
    )
    expect(ingestForensicReport(report('<a@receiver.example>'))).toEqual({
      ingested: false,
      reason: 'duplicate',
    })
  })

  it('stops at the daily cap per domain and starts again the next day', () => {
    ingestForensicReport(report('<1@r>'))
    ingestForensicReport(report('<2@r>'))
    expect(ingestForensicReport(report('<3@r>'))).toEqual({
      ingested: false,
      reason: 'daily_cap',
    })
    expect(ingestForensicReport(report('<4@r>', DAY + 90_000)).ingested).toBe(
      true,
    )
  })

  it('lists a domain newest first without the report mail id', () => {
    ingestForensicReport(report('<1@r>', DAY + 10))
    ingestForensicReport(report('<2@r>', DAY + 20))
    const rows = getForensicReportsForDomain('EXAMPLE.COM', 10)
    expect(rows.map((r) => r.arrivalDate)).toEqual([DAY + 20, DAY + 10])
    expect(rows[0]).not.toHaveProperty('sourceMessageId')
  })
})
