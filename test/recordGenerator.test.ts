import {
  buildDmarcRecord,
  buildMtaStsPolicy,
  buildMtaStsTxtRecord,
  buildSpfRecord,
  buildTlsRptRecord,
} from '@/utils/record-generator'
import { describe, expect, it } from 'vitest'

describe('record generator', () => {
  it('builds a DMARC record without default tags', () => {
    expect(
      buildDmarcRecord({ policy: 'none', rua: ['dmarc@example.com'] }),
    ).toBe('v=DMARC1; p=none; rua=mailto:dmarc@example.com')
  })

  it('builds a staged DMARC record with every option', () => {
    expect(
      buildDmarcRecord({
        policy: 'quarantine',
        subdomainPolicy: 'reject',
        percent: 25,
        rua: ['a@example.com', 'mailto:b@example.com'],
        ruf: ['f@example.com'],
        reportAnyFailure: true,
        strictDkim: true,
        strictSpf: true,
      }),
    ).toBe(
      'v=DMARC1; p=quarantine; sp=reject; pct=25; rua=mailto:a@example.com,mailto:b@example.com; ruf=mailto:f@example.com; fo=1; adkim=s; aspf=s',
    )
  })

  it('builds an SPF record in evaluation order', () => {
    expect(
      buildSpfRecord({
        includes: ['_spf.example.net'],
        ip4: ['192.0.2.0/24'],
        ip6: ['2001:db8::/32'],
        mx: true,
        a: false,
        all: 'fail',
      }),
    ).toBe(
      'v=spf1 mx ip4:192.0.2.0/24 ip6:2001:db8::/32 include:_spf.example.net -all',
    )
  })

  it('builds TLS-RPT and MTA-STS records', () => {
    expect(
      buildTlsRptRecord([
        'tls@example.com',
        'https://reports.example.com/tlsrpt',
      ]),
    ).toBe(
      'v=TLSRPTv1; rua=mailto:tls@example.com,https://reports.example.com/tlsrpt',
    )
    expect(buildMtaStsTxtRecord('2026-01-31T12:00')).toBe(
      'v=STSv1; id=20260131T1200',
    )
    expect(
      buildMtaStsPolicy({
        mode: 'testing',
        mx: ['mx1.example.com.', '*.example.net'],
        maxAge: 604_800,
      }),
    ).toBe(
      'version: STSv1\nmode: testing\nmx: mx1.example.com\nmx: *.example.net\nmax_age: 604800',
    )
  })
})
