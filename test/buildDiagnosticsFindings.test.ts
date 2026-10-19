import type { DiagnosticsFinding, DnsDiagnostics } from '@/types/diagnostics'
import {
  buildDiagnosticsFindings,
  diagnosticsTabHref,
  parseDiagnosticsTab,
} from '@/utils/diagnostics'
import { describe, expect, it } from 'vitest'
import { makeDnsDiagnostics } from './setup/makeDnsDiagnostics'

const CHECKED_AT = '2026-01-02T03:04:05.000Z'

function findingsFor(dns: DnsDiagnostics): DiagnosticsFinding[] {
  return buildDiagnosticsFindings({ dns, checkedAt: CHECKED_AT })
}

function finding(
  findings: DiagnosticsFinding[],
  id: DiagnosticsFinding['id'],
): DiagnosticsFinding {
  const match = findings.find((entry) => entry.id === id)
  if (!match) throw new Error(`no ${id} finding`)
  return match
}

const noSelector = (selector: string, fromReports = false) => ({
  selector,
  record: null,
  valid: false,
  fromReports,
})

describe('buildDiagnosticsFindings', () => {
  it('returns one finding per protocol, most urgent first', () => {
    const findings = findingsFor(makeDnsDiagnostics())

    expect(findings.map((entry) => entry.id).toSorted()).toEqual(
      ['bimi', 'dkim', 'dmarc', 'mtaSts', 'spf', 'tlsRpt'].toSorted(),
    )
    expect(findings[0]?.severity).toBe('high')
    expect(findings.at(-1)?.severity).toBe('pass')
  })

  it('says which selectors were checked when none holds a key', () => {
    const dns = makeDnsDiagnostics({
      dkim: [noSelector('s2024', true), noSelector('default')],
    })

    const dkim = finding(findingsFor(dns), 'dkim')

    expect(dkim.state).toBe('No valid DKIM selector found among those checked')
    expect(dkim.detail).toContain('Checked 2 selectors')
    expect(dkim.detail).toContain('1 seen in received reports')
    expect(dkim.detail).toContain('s2024, default')
  })

  it('offers the same DMARC record at p=quarantine for p=none', () => {
    const record = 'v=DMARC1; p=none; sp=none; rua=mailto:dmarc@example.com'
    const dns = makeDnsDiagnostics({ dmarc: record, dmarcPolicy: 'none' })

    const dmarc = finding(findingsFor(dns), 'dmarc')

    expect(dmarc.state).toBe('p=none (monitoring only)')
    expect(dmarc.fix).toEqual({
      host: '_dmarc.example.com',
      value: 'v=DMARC1; p=quarantine; sp=none; rua=mailto:dmarc@example.com',
    })
  })

  it('points a missing TLS-RPT record at the DMARC report mailbox', () => {
    const dns = makeDnsDiagnostics({
      dmarcTags: [
        {
          tag: 'rua',
          value: 'mailto:dmarc@example.com',
          description: 'Aggregate reports',
        },
      ],
    })

    const tlsRpt = finding(findingsFor(dns), 'tlsRpt')

    expect(tlsRpt.fix).toEqual({
      host: '_smtp._tls.example.com',
      value: 'v=TLSRPTv1; rua=mailto:dmarc@example.com',
    })
  })

  it('dates the suggested MTA-STS policy id from the run', () => {
    const mtaSts = finding(findingsFor(makeDnsDiagnostics()), 'mtaSts')

    expect(mtaSts.fix?.value).toBe('v=STSv1; id=20260102030405')
  })
})

describe('diagnostics tab links', () => {
  it('falls back to Findings for an unknown tab', () => {
    expect(parseDiagnosticsTab('auth')).toBe('auth')
    expect(parseDiagnosticsTab('nope')).toBe('findings')
    expect(parseDiagnosticsTab(undefined)).toBe('findings')
  })

  it('keeps the date range and adds the anchor', () => {
    expect(
      diagnosticsTabHref({
        domain: 'example.com',
        query: 'days=7',
        tab: 'auth',
        anchor: 'diagnostics-section-dkim',
      }),
    ).toBe('/diagnostics/example.com?days=7&tab=auth#diagnostics-section-dkim')
  })
})
