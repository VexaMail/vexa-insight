import { describe, expect, it } from 'vitest'

import type {
  DiagnosticsAnalysisInput,
  DiagnosticsDnsSummary,
} from '@/services/ai'
import {
  buildDiagnosticsAnalysisPrompt,
  DIAGNOSTICS_ANALYSIS_SYSTEM,
} from '@/services/ai'

describe('buildDiagnosticsAnalysisPrompt', () => {
  function makeDnsSummary(
    overrides: Partial<DiagnosticsDnsSummary> = {},
  ): DiagnosticsDnsSummary {
    return {
      spfRecord: 'v=spf1 include:_spf.example.net ~all',
      spfValid: true,
      spfWarning: 'SPF ends with ~all instead of -all.',
      spfCategories: [
        {
          category: 'Syntax',
          checks: [{ name: 'single-record', passed: true, detail: 'ok' }],
        },
        {
          category: 'Limits',
          checks: [
            {
              name: 'lookup-count',
              passed: false,
              detail: '12 DNS lookups exceed the limit of 10',
            },
          ],
        },
      ],
      dmarcRecord: 'v=DMARC1; p=none; rua=mailto:dmarc@example.com',
      dmarcPolicy: 'none',
      dmarcValid: false,
      dmarcWarnings: ['Unknown tag `pxt`.'],
      dmarcTags: [
        { tag: 'p', value: 'none', description: 'Policy for the domain' },
      ],
      dkimSelectors: [
        {
          selector: 'selector1',
          valid: true,
          record: 'v=DKIM1; k=rsa; p=MIIB',
          keyType: 'rsa',
          keyLengthBits: 2048,
          publicKeyPresent: true,
          errors: [],
        },
        {
          selector: 'google',
          valid: false,
          record: null,
          keyType: null,
          keyLengthBits: null,
          publicKeyPresent: false,
          errors: ['no TXT record found'],
        },
      ],
      mxHosts: ['mx1.example.com'],
      aRecords: ['203.0.113.10'],
      nsRecords: ['ns1.example.net'],
      bimiRecord: 'v=BIMI1; l=https://example.com/logo.svg',
      bimiValid: true,
      bimiLogoUrl: 'https://example.com/logo.svg',
      bimiCertificateUrl: null,
      mtaStsRecord: 'v=STSv1; id=20240101',
      mtaStsValid: true,
      mtaStsPolicyAccessible: true,
      mtaStsMode: 'enforce',
      mtaStsMxRecords: ['mx1.example.com'],
      tlsRptRecord: 'v=TLSRPTv1; rua=mailto:tlsrpt@example.com',
      tlsRptValid: true,
      tlsRptRuaAddresses: ['mailto:tlsrpt@example.com'],
      ...overrides,
    }
  }

  function makeFullInput(): DiagnosticsAnalysisInput {
    return {
      domainName: 'example.com',
      score: { grade: 'C', percentage: 61 },
      dns: makeDnsSummary(),
      stats: {
        totalMessages: 400,
        failedMessages: 25,
        passRate: 94,
        spfAuthFailCount: 10,
        spfPermerrorCount: 2,
        spfTemperrorCount: 1,
        spfSoftfailCount: 4,
        spfPassUnalignedCount: 3,
        dkimAllFailCount: 8,
        dkimPassUnalignedCount: 5,
        dmarcOverrideForwarded: 6,
        dmarcOverrideLocalPolicy: 1,
      },
      reportAggregate: {
        reportCount: 7,
        orgCount: 3,
        totalMessages: 200,
        spfPassCount: 150,
        dkimPassCount: 190,
        spfAlignedCount: 149,
        dkimAlignedCount: 190,
        dispositionBreakdown: { none: 195, quarantine: 5 },
        topOrgs: [{ orgName: 'google.com', messageCount: 120 }],
        forwardedOverrideCount: 4,
        dateRange: { start: '2026-06-01', end: '2026-06-30' },
      },
      adminGuides: [
        {
          severity: 'high',
          title: 'SPF needs correction',
          summary: 'The SPF record exceeds the lookup limit.',
          howToFix: 'Reduce include mechanisms.',
          verifySteps: ['dig TXT example.com +short', 'Recheck the report.'],
        },
      ],
    }
  }

  it('uses the diagnostics system prompt with the do-not-repeat-runbook instruction', () => {
    const { systemPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(systemPrompt).toBe(DIAGNOSTICS_ANALYSIS_SYSTEM)
    expect(systemPrompt).toContain('deterministic operator runbook')
    expect(systemPrompt).toContain('Do NOT simply restate it')
    expect(systemPrompt).toContain(
      'If a deterministic guide already covers the same issue',
    )
  })

  it('instructs the model to end with an ordered rollout plan section', () => {
    const { systemPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(systemPrompt).toContain(
      '"insights" (array of insight objects) and "rolloutPlan" (array of strings)',
    )
    expect(systemPrompt).toContain('ROLLOUT PLAN RULES')
    expect(systemPrompt).toContain(
      'End the response with "rolloutPlan": an ordered list of concrete next steps',
    )
    expect(systemPrompt).toContain('Put the highest-impact work first.')
    expect(systemPrompt).toContain(
      'Start each step with the protocol it touches in square brackets',
    )
    expect(systemPrompt).toContain('{"insights":[],"rolloutPlan":[]}')
    expect(systemPrompt).toContain('"rolloutPlan": [')
  })

  it('includes the domain and the current score section', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'Analyze the email security posture for domain: example.com',
    )
    expect(userPrompt).toContain('CURRENT DOMAIN SCORE: 61% (C)')
  })

  it('includes SPF details with validity, warning, and failed checks', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

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
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'DMARC record: v=DMARC1; p=none; rua=mailto:dmarc@example.com',
    )
    expect(userPrompt).toContain('policy: none')
    expect(userPrompt).toContain('DMARC validation errors: Unknown tag `pxt`.')
    expect(userPrompt).toContain('p => Policy for the domain')
  })

  it('includes DKIM selector details split by valid and missing selectors', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

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
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

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
      ...makeFullInput(),
      dns: makeDnsSummary({
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

  it('includes the authentication statistics section', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'AUTHENTICATION STATISTICS (period aggregate):',
    )
    expect(userPrompt).toContain('Total messages: 400')
    expect(userPrompt).toContain('Failed messages: 25')
    expect(userPrompt).toContain('Pass rate: 94%')
    expect(userPrompt).toContain('SPF permerror: 2')
    expect(userPrompt).toContain('DKIM total failures: 8')
    expect(userPrompt).toContain('DMARC overrides (forwarded): 6')
  })

  it('includes the aggregated report section with rounded rates', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'AGGREGATED REPORT DATA (7 reports, 3 orgs, period: 2026-06-01 – 2026-06-30):',
    )
    expect(userPrompt).toContain('SPF pass: 150 (75%)')
    expect(userPrompt).toContain('DKIM pass: 190 (95%)')
    expect(userPrompt).toContain('SPF aligned: 149 (75%)')
    expect(userPrompt).toContain('Dispositions: none: 195, quarantine: 5')
    expect(userPrompt).toContain('Top reporting orgs: google.com (120 msgs)')
  })

  it('includes the deterministic runbook section with severity, fix, and verify steps', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'DETERMINISTIC OPERATOR RUNBOOK ALREADY SHOWN IN UI:',
    )
    expect(userPrompt).toContain(
      '- [high] SPF needs correction: The SPF record exceeds the lookup limit. | how to fix: Reduce include mechanisms. | verify: dig TXT example.com +short ; Recheck the report.',
    )
  })

  it('lists all available data sources', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(makeFullInput())

    expect(userPrompt).toContain(
      'AVAILABLE DATA SOURCES: score, DNS, diagnostic stats, report aggregate',
    )
  })

  it('omits sections and runbook when only the domain name is provided', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt({
      domainName: 'empty.example',
      score: null,
      dns: null,
      stats: null,
      reportAggregate: null,
      adminGuides: [],
    })

    expect(userPrompt).toContain(
      'Analyze the email security posture for domain: empty.example',
    )
    expect(userPrompt).not.toContain('CURRENT DOMAIN SCORE')
    expect(userPrompt).not.toContain('DNS CONFIGURATION:')
    expect(userPrompt).not.toContain('AUTHENTICATION STATISTICS')
    expect(userPrompt).not.toContain('AGGREGATED REPORT DATA')
    expect(userPrompt).not.toContain('DETERMINISTIC OPERATOR RUNBOOK')
    expect(userPrompt).toContain('AVAILABLE DATA SOURCES: ')
  })
})
