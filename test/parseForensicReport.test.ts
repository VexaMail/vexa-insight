import {
  findArfPartIds,
  headerSectionOf,
  isFeedbackReportStructure,
  parseForensicReport,
} from '@/utils/forensic'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const fixture = (name: string): string =>
  readFileSync(path.join(__dirname, 'fixtures', 'forensic', name), 'utf-8')

const DOMAIN = 'example.com'
const FEEDBACK = fixture('opendmarc-feedback.txt')
const HEADERS = fixture('opendmarc-headers.txt')

describe('parseForensicReport', () => {
  it('reads an OpenDMARC failure report and keeps only identifiers', () => {
    const report = parseForensicReport(
      FEEDBACK,
      headerSectionOf(Buffer.from(HEADERS)),
    )
    expect(report).toEqual({
      reportedDomain: DOMAIN,
      feedbackType: 'auth-failure',
      authFailure: 'dmarc',
      sourceIp: '192.0.2.10',
      reportingMta: 'receiver.example',
      arrivalDate: Date.parse('2026-09-11T17:00:40Z') / 1000,
      headerFromDomain: DOMAIN,
      envelopeFromDomain: 'lists.example.net',
      dkimDomain: DOMAIN,
      dkimSelector: 'default',
      spfResult: null,
      dkimResult: null,
      dmarcResult: 'fail',
      originalMessageId: '20260911170040.1234-1-jane@example.com',
      listId: 'dev-list.lists.example.net',
    })
    expect(JSON.stringify(report)).not.toMatch(/Jane|someone|PATCH|body/)
  })

  it('prefers Arrival-Date and DKIM fields from the feedback part', () => {
    const report = parseForensicReport(
      `${FEEDBACK}Arrival-Date: Thu, 10 Sep 2026 08:00:00 +0000\nDKIM-Domain: Example.com\nDKIM-Selector: s2\n`,
      HEADERS,
    )
    expect(report.arrivalDate).toBe(Date.parse('2026-09-10T08:00:00Z') / 1000)
    expect(report.dkimDomain).toBe(DOMAIN)
    expect(report.dkimSelector).toBe('s2')
  })

  it("reads SPF and DKIM from the reporter's own Authentication-Results", () => {
    const headers = [
      'Authentication-Results: receiver.example;',
      '\tdkim=fail reason="signature verification failed" header.d=example.com;',
      '\tdkim-atps=neutral',
      'Authentication-Results: relay.lists.example.net; spf=pass',
      HEADERS,
    ].join('\n')
    const report = parseForensicReport(
      FEEDBACK,
      headerSectionOf(Buffer.from(headers)),
    )
    expect(report.dkimResult).toBe('fail')
    expect(report.spfResult).toBeNull()
    expect(report.dmarcResult).toBe('fail')
  })

  it('falls back to the From domain when Reported-Domain is missing', () => {
    const feedback = FEEDBACK.replace(/^Reported-Domain:.*$/m, '')
    expect(parseForensicReport(feedback, HEADERS).reportedDomain).toBe(DOMAIN)
  })

  it('throws when nothing names the domain', () => {
    const feedback = FEEDBACK.replace(/^Reported-Domain:.*$/m, '')
    expect(() => parseForensicReport(feedback, null)).toThrow(/Reported-Domain/)
  })

  it('ignores a Source-IP that is not an address', () => {
    const feedback = FEEDBACK.replace(/^Source-IP:.*$/m, 'Source-IP: unknown')
    expect(parseForensicReport(feedback, null).sourceIp).toBeNull()
  })
})

describe('headerSectionOf', () => {
  it('stops at the end of the header section', () => {
    expect(headerSectionOf(Buffer.from(HEADERS))).not.toContain('body')
  })
})

describe('ARF structure detection', () => {
  const arf = {
    type: 'multipart/report',
    partId: null,
    parameters: { 'report-type': 'feedback-report' },
    childNodes: [
      { type: 'text/plain', partId: '1' },
      { type: 'message/feedback-report', partId: '2' },
      { type: 'text/rfc822-headers', partId: '3' },
    ],
  }

  it('recognises a feedback report but not a delivery status report', () => {
    expect(isFeedbackReportStructure(arf)).toBe(true)
    expect(
      isFeedbackReportStructure({
        ...arf,
        parameters: { 'report-type': 'delivery-status' },
      }),
    ).toBe(false)
    expect(isFeedbackReportStructure({ type: 'text/plain' })).toBe(false)
  })

  it('finds the feedback and headers parts', () => {
    expect(findArfPartIds(arf)).toEqual({
      feedbackPartId: '2',
      headersPartId: '3',
    })
  })

  it('accepts a whole message/rfc822 as the headers part', () => {
    const withMessage = {
      ...arf,
      childNodes: [
        { type: 'message/feedback-report', partId: '2' },
        { type: 'message/rfc822', partId: '3', childNodes: [] },
      ],
    }
    expect(findArfPartIds(withMessage)?.headersPartId).toBe('3')
  })

  it('returns null without a feedback part', () => {
    expect(findArfPartIds({ ...arf, childNodes: [] })).toBeNull()
  })
})
