import {
  extractTlsJsonFromBuffer,
  parseTlsReportFileToResult,
  parseTlsReportJson,
} from '@/utils/tlsrpt'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'

const FIXTURE = readFileSync(
  path.join(__dirname, 'fixtures', 'tlsrpt', 'sts-with-failures.json'),
)

describe('parseTlsReportJson', () => {
  it('reads the report header and date range as Unix seconds', () => {
    const report = parseTlsReportJson(FIXTURE)
    expect(report.reportId).toBe('2026-09-28T00:00:00Z_example.com')
    expect(report.orgName).toBe('Receiver Example Inc.')
    expect(report.contactInfo).toBe('tls-reports@receiver.example')
    expect(report.beginDate).toBe(Date.UTC(2026, 8, 28) / 1000)
    expect(report.endDate).toBe(Date.UTC(2026, 8, 28, 23, 59, 59) / 1000)
  })

  it('normalises the policy domain and reads counts and failure details', () => {
    const [sts, none] = parseTlsReportJson(FIXTURE).policies
    expect(sts).toMatchObject({
      policyType: 'sts',
      policyDomain: 'example.com',
      mxHosts: ['mx1.example.com'],
      successfulSessionCount: 120,
      failedSessionCount: 4,
    })
    expect(sts?.failureDetails).toEqual([
      {
        resultType: 'certificate-expired',
        sendingMtaIp: '192.0.2.10',
        receivingMxHostname: 'mx1.example.com',
        receivingIp: '198.51.100.25',
        failedSessionCount: 3,
        failureReasonCode: null,
      },
      {
        resultType: 'starttls-not-supported',
        sendingMtaIp: '192.0.2.11',
        receivingMxHostname: 'mx1.example.com',
        receivingIp: null,
        failedSessionCount: 1,
        failureReasonCode: '421-4.7.0',
      },
    ])
    expect(none).toMatchObject({
      policyType: 'no-policy-found',
      policyDomain: 'sub.example.com',
      mxHosts: ['mx2.example.com'],
      failureDetails: [],
    })
  })

  it('rejects a report without report-id', () => {
    const json = JSON.parse(FIXTURE.toString('utf-8')) as Record<
      string,
      unknown
    >
    delete json['report-id']
    expect(() => parseTlsReportJson(Buffer.from(JSON.stringify(json)))).toThrow(
      /report-id/,
    )
  })

  it('rejects an unparseable date range', () => {
    const json = JSON.parse(FIXTURE.toString('utf-8')) as Record<
      string,
      unknown
    >
    json['date-range'] = { 'start-datetime': 'yesterday' }
    expect(() => parseTlsReportJson(Buffer.from(JSON.stringify(json)))).toThrow(
      /start-datetime/,
    )
  })
})

describe('parseTlsReportFileToResult', () => {
  it('parses a gzipped report whatever its filename says', () => {
    const report = parseTlsReportFileToResult(gzipSync(FIXTURE))
    expect(report?.policies).toHaveLength(2)
  })

  it('returns null for a DMARC aggregate XML file', () => {
    expect(
      parseTlsReportFileToResult(
        Buffer.from('<?xml version="1.0"?><feedback/>'),
      ),
    ).toBeNull()
  })

  it('returns null for JSON that is not a TLS report', () => {
    expect(
      parseTlsReportFileToResult(Buffer.from('{"hello":"world"}')),
    ).toBeNull()
  })
})

describe('extractTlsJsonFromBuffer', () => {
  it('returns null for gzip that does not hold JSON', () => {
    expect(
      extractTlsJsonFromBuffer(gzipSync(Buffer.from('<feedback/>'))),
    ).toBeNull()
  })
})
