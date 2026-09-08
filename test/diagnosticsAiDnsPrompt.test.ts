import { describe, expect, it } from 'vitest'

import type { DiagnosticsAnalysisInput } from '@/services/ai'
import { buildDiagnosticsAnalysisPrompt } from '@/services/ai'
import { makeDiagnosticsAnalysisInput } from './setup/makeDiagnosticsAnalysisInput'
import { makeDiagnosticsDnsSummary } from './setup/makeDiagnosticsDnsSummary'

describe('buildDiagnosticsAnalysisPrompt: DNS configuration section', () => {
  it('includes the domain and the current score section', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain(
      'Analyze the email security posture for domain: example.com',
    )
    expect(userPrompt).toContain('CURRENT DOMAIN SCORE: 61% (C)')
  })

  it('includes SPF details with validity, warning, and failed checks', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain('DNS CONFIGURATION:')
    expect(userPrompt).toContain(
      'SPF record: v=spf1 include:_spf.example.net ~all',
    )
    expect(userPrompt).toContain('valid: true')
    expect(userPrompt).toContain('warning: SPF ends with ~all instead of -all.')
    expect(userPrompt).toContain('Syntax: no issues')
    expect(userPrompt).toContain(
      'Limits: lookup-count: 12 DNS lookups exceed the limit of 10',
    )
  })

  it('includes DMARC record, policy, warnings, and parsed tags', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain(
      'DMARC record: v=DMARC1; p=none; rua=mailto:dmarc@example.com',
    )
    expect(userPrompt).toContain('policy: none')
    expect(userPrompt).toContain('DMARC validation errors: Unknown tag `pxt`.')
    expect(userPrompt).toContain('p => Policy for the domain')
  })

  it('includes DKIM selector details split by valid and missing selectors', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain(
      'DKIM selectors with valid DNS records: selector1',
    )
    expect(userPrompt).toContain(
      'DKIM common selectors probed but NOT found in DNS: google',
    )
    expect(userPrompt).toContain(
      'selector=selector1, valid=true, keyType=rsa, keyLengthBits=2048, publicKeyPresent=true',
    )
    expect(userPrompt).toContain('errors=no TXT record found')
  })

  it('includes BIMI, MTA-STS, and TLS-RPT summaries', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain(
      'BIMI record: v=BIMI1; l=https://example.com/logo.svg (valid: true, logo: https://example.com/logo.svg, certificate: none)',
    )
    expect(userPrompt).toContain(
      'MTA-STS record: v=STSv1; id=20240101 (valid: true, policy file accessible: true, mode: enforce, policy mx: mx1.example.com)',
    )
    expect(userPrompt).toContain(
      'TLS-RPT record: v=TLSRPTv1; rua=mailto:tlsrpt@example.com (valid: true, rua: mailto:tlsrpt@example.com)',
    )
  })

  it('marks absent optional protocols as NOT CONFIGURED', () => {
    const input: DiagnosticsAnalysisInput = {
      ...makeDiagnosticsAnalysisInput(),
      dns: makeDiagnosticsDnsSummary({
        spfRecord: null,
        bimiRecord: null,
        mtaStsRecord: null,
        tlsRptRecord: null,
        dkimSelectors: [],
        mxHosts: [],
      }),
    }

    const { userPrompt } = buildDiagnosticsAnalysisPrompt(input)

    expect(userPrompt).toContain('SPF record: NOT CONFIGURED')
    expect(userPrompt).toContain('BIMI record: NOT CONFIGURED')
    expect(userPrompt).toContain('MTA-STS record: NOT CONFIGURED')
    expect(userPrompt).toContain('TLS-RPT record: NOT CONFIGURED')
    expect(userPrompt).toContain(
      'DKIM selectors with valid DNS records: none found',
    )
    expect(userPrompt).toContain('MX hosts: none found')
  })
})
