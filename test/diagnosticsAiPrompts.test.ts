import { describe, expect, it } from 'vitest'

import { buildDiagnosticsAnalysisPrompt } from '@/services/ai'
import { makeDiagnosticsAnalysisInput } from './setup/makeDiagnosticsAnalysisInput'

describe('buildDiagnosticsAnalysisPrompt: traffic, runbook and empty input', () => {
  it('includes the authentication statistics section', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

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
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

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
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

    expect(userPrompt).toContain(
      'DETERMINISTIC OPERATOR RUNBOOK ALREADY SHOWN IN UI:',
    )
    expect(userPrompt).toContain(
      '- [high] SPF needs correction: The SPF record exceeds the lookup limit. | how to fix: Reduce include mechanisms. | verify: dig TXT example.com +short ; Recheck the report.',
    )
  })

  it('lists all available data sources', () => {
    const { userPrompt } = buildDiagnosticsAnalysisPrompt(
      makeDiagnosticsAnalysisInput(),
    )

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
