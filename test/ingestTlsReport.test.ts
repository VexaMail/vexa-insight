import {
  getDb,
  runMigrations,
  tlsReportFailures,
  tlsReportPolicies,
  tlsReports,
} from '@/lib/db'
import {
  getTlsDomainFailures,
  getTlsDomainSummary,
  ingestTlsReport,
} from '@/services/tlsrpt'
import { parseTlsReportJson } from '@/utils/tlsrpt'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const FIXTURE = readFileSync(
  path.join(__dirname, 'fixtures', 'tlsrpt', 'sts-with-failures.json'),
)

describe('ingestTlsReport', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    const db = getDb()
    db.delete(tlsReportFailures).run()
    db.delete(tlsReportPolicies).run()
    db.delete(tlsReports).run()
  })

  it('stores a report once and skips the duplicate', () => {
    const report = parseTlsReportJson(FIXTURE)
    expect(ingestTlsReport(report).ingested).toBe(true)
    expect(ingestTlsReport(report)).toEqual({
      ingested: false,
      reason: 'duplicate_report_id',
    })
    expect(getDb().select().from(tlsReportPolicies).all()).toHaveLength(2)
    expect(getDb().select().from(tlsReportFailures).all()).toHaveLength(2)
  })

  it('keeps reports from two organisations that reuse a report id', () => {
    const report = parseTlsReportJson(FIXTURE)
    ingestTlsReport(report)
    const other = { ...report, orgName: 'Other Receiver' }
    expect(ingestTlsReport(other).ingested).toBe(true)
  })

  it('sums sessions per reporter and policy type for a domain', () => {
    const report = parseTlsReportJson(FIXTURE)
    ingestTlsReport(report)
    ingestTlsReport({ ...report, reportId: 'second-day' })

    expect(getTlsDomainSummary('EXAMPLE.com')).toEqual([
      {
        orgName: 'Receiver Example Inc.',
        policyType: 'sts',
        reportCount: 2,
        successfulSessionCount: 240,
        failedSessionCount: 8,
        lastEndDate: report.endDate,
      },
    ])
    expect(getTlsDomainSummary('sub.example.com')[0]).toMatchObject({
      policyType: 'no-policy-found',
      successfulSessionCount: 14,
      failedSessionCount: 0,
    })
  })

  it('groups failures by result type and MX, largest first', () => {
    ingestTlsReport(parseTlsReportJson(FIXTURE))
    expect(
      getTlsDomainFailures('example.com').map((row) => [
        row.resultType,
        row.failedSessionCount,
      ]),
    ).toEqual([
      ['certificate-expired', 3],
      ['starttls-not-supported', 1],
    ])
    expect(getTlsDomainFailures('sub.example.com')).toEqual([])
  })
})
