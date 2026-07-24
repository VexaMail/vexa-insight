import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { DmarcDetailSection, SpfDetailSection } from '@/components/diagnostics'
import type { DnsDiagnostics } from '@/types/diagnostics'
import { ProtocolExplainer } from '../components/diagnostics/shared'

export function makeDns(
  overrides: Partial<DnsDiagnostics> = {},
): DnsDiagnostics {
  return {
    domain: 'example.com',
    txtRecords: [],
    spf: 'v=spf1 include:_spf.example.net -all',
    spfValid: true,
    spfWarning: null,
    spfValidationCategories: [],
    spfTree: null,
    dmarc: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com',
    dmarcPolicy: 'reject',
    dmarcValid: true,
    dmarcWarnings: [],
    dmarcTags: [],
    dkim: [],
    dkimParsedRecords: [],
    mx: [],
    bimi: { raw: null, valid: false, logoUrl: null, certificateUrl: null },
    mtaSts: {
      raw: null,
      valid: false,
      policyFileAccessible: false,
      policyHost: null,
      mode: null,
      fileAge: null,
      mxRecords: [],
    },
    tlsRpt: { raw: null, valid: false, ruaAddresses: [] },
    aRecords: [],
    nsRecords: [],
    ...overrides,
  }
}

describe('ProtocolExplainer', () => {
  it('renders title, summary, and both example blocks when provided', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ProtocolExplainer, {
        title: 'How to read SPF',
        summary: 'A healthy SPF record authorizes all legitimate senders.',
        exampleHost: 'example.com',
        exampleValue: 'v=spf1 include:mail.example.net -all',
      }),
    )

    expect(markup).toContain('How to read SPF')
    expect(markup).toContain(
      'A healthy SPF record authorizes all legitimate senders.',
    )
    expect(markup).toContain('Example Host')
    expect(markup).toContain('example.com')
    expect(markup).toContain('Example Value')
    expect(markup).toContain('v=spf1 include:mail.example.net -all')
  })

  it('omits the example grid entirely when no examples are provided', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ProtocolExplainer, {
        title: 'DKIM basics',
        summary: 'DKIM signs outbound mail with a private key.',
      }),
    )

    expect(markup).toContain('DKIM basics')
    expect(markup).not.toContain('Example Host')
    expect(markup).not.toContain('Example Value')
  })

  it('renders only the value block when just an example value is provided', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ProtocolExplainer, {
        title: 'TLS-RPT',
        summary: 'TLS-RPT declares where TLS failure reports go.',
        exampleValue: 'v=TLSRPTv1; rua=mailto:tlsrpt@example.com',
      }),
    )

    expect(markup).not.toContain('Example Host')
    expect(markup).toContain('Example Value')
    expect(markup).toContain('v=TLSRPTv1; rua=mailto:tlsrpt@example.com')
  })

  it('renders only the host block when just an example host is provided', () => {
    const markup = renderToStaticMarkup(
      React.createElement(ProtocolExplainer, {
        title: 'MTA-STS',
        summary: 'MTA-STS enforces TLS on inbound delivery.',
        exampleHost: '_mta-sts.example.com',
      }),
    )

    expect(markup).toContain('Example Host')
    expect(markup).toContain('_mta-sts.example.com')
    expect(markup).not.toContain('Example Value')
  })
})

describe('protocol explainer content in detail sections', () => {
  it('SpfDetailSection embeds the SPF explainer with a domain-based example', () => {
    const markup = renderToStaticMarkup(
      React.createElement(SpfDetailSection, { dns: makeDns() }),
    )

    expect(markup).toContain('How to read SPF')
    expect(markup).toContain('Example Host')
    expect(markup).toContain('example.com')
    expect(markup).toContain(
      'v=spf1 include:mail.example.net ip4:203.0.113.10 -all',
    )
  })

  it('DmarcDetailSection embeds the DMARC explainer with _dmarc host and policy example', () => {
    const markup = renderToStaticMarkup(
      React.createElement(DmarcDetailSection, { dns: makeDns() }),
    )

    expect(markup).toContain('What this record is for')
    expect(markup).toContain('_dmarc.example.com')
    expect(markup).toContain(
      'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; pct=100',
    )
  })
})
