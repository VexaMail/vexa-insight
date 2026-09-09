import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { DiagnosticsView, ExportPdfButton } from '@/components/diagnostics'
import { AppShell } from '@/components/shell'
import type { DnsDiagnostics, DomainScore } from '@/types/diagnostics'

const PRINT_HIDDEN = 'print:hidden'

vi.mock('next/navigation', () => ({
  usePathname: () => '/diagnostics/example.com',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useSearchParams: () => new URLSearchParams(''),
}))

describe('diagnostics PDF export', () => {
  function makeDns(): DnsDiagnostics {
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
    }
  }

  const score: DomainScore = { grade: 'A', percentage: 92 }

  function renderDiagnosticsView(): string {
    return renderToStaticMarkup(
      React.createElement(DiagnosticsView, {
        domains: [{ id: 1, name: 'example.com' }],
        currentDomainName: 'example.com',
        days: 30,
        dns: makeDns(),
        score,
      }),
    )
  }

  function findTag(markup: string, pattern: RegExp): string {
    return pattern.exec(markup)?.[0] ?? ''
  }

  it('renders a Download PDF action that is itself excluded from print', () => {
    const markup = renderToStaticMarkup(React.createElement(ExportPdfButton))

    expect(markup).toContain('Download PDF')
    expect(findTag(markup, /<button[^>]*>/)).toContain(PRINT_HIDDEN)
  })

  it('places the export action in the diagnostics report header', () => {
    const markup = renderDiagnosticsView()

    expect(markup).toContain('Diagnostics')
    expect(markup).toContain('Download PDF')
    expect(markup).toContain('Domain Security Score')
  })

  it('hides the header filter controls from the printed report', () => {
    const markup = renderDiagnosticsView()

    expect(markup).toContain('flex flex-wrap items-center gap-4 print:hidden')
  })

  it('hides the sidebar, top bar and theme toggle when printing', () => {
    const markup = renderToStaticMarkup(
      React.createElement(AppShell, null, 'report-body'),
    )

    expect(findTag(markup, /<aside[^>]*>/)).toContain(PRINT_HIDDEN)
    expect(findTag(markup, /<header[^>]*>/)).toContain(PRINT_HIDDEN)
    expect(
      findTag(markup, /<button[^>]*aria-label="Switch to [^"]*"[^>]*>/),
    ).toContain(PRINT_HIDDEN)
  })

  it('releases the inner scroll container so the report can paginate', () => {
    const markup = renderToStaticMarkup(
      React.createElement(AppShell, null, 'report-body'),
    )

    const shellRoot = findTag(markup, /<div[^>]*>/)
    expect(shellRoot).toContain('print:h-auto')
    expect(shellRoot).toContain('print:overflow-visible')

    const mainTag = findTag(markup, /<main[^>]*>/)
    expect(mainTag).toContain('print:overflow-visible')
    expect(markup).toContain('report-body')
  })
})
