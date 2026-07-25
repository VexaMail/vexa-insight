import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { SpfLookupTreeSection } from '@/components/diagnostics'
import type { DnsDiagnostics, SpfTreeNode } from '@/types/diagnostics'

describe('SpfLookupTreeSection', () => {
  function makeTreeNode(overrides: Partial<SpfTreeNode> = {}): SpfTreeNode {
    return {
      domain: 'example.com',
      record: 'v=spf1 include:_spf.example.net -all',
      mechanisms: ['include:_spf.example.net'],
      children: [],
      lookupCount: 1,
      missingRecord: false,
      cycleDetected: false,
      exceedsLookupLimit: false,
      ignoredRedirect: null,
      macroMechanisms: [],
      ...overrides,
    }
  }

  function makeDnsWithTree(tree: SpfTreeNode | null): DnsDiagnostics {
    return {
      domain: 'example.com',
      txtRecords: [],
      spf: 'v=spf1 include:_spf.example.net -all',
      spfValid: true,
      spfWarning: null,
      spfValidationCategories: [],
      spfTree: tree,
      dmarc: null,
      dmarcPolicy: null,
      dmarcValid: false,
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

  it('renders the tree as nested lists with domains and lookup counts', () => {
    const tree = makeTreeNode({
      children: [
        makeTreeNode({
          domain: '_spf.example.net',
          record: 'v=spf1 mx -all',
          mechanisms: ['mx'],
          lookupCount: 1,
        }),
      ],
      lookupCount: 2,
    })

    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(tree),
      }),
    )

    expect(markup).toContain('SPF Lookup Tree')
    expect(markup).toContain('<ul')
    expect(markup).toContain('<li')
    expect(markup).toContain('example.com')
    expect(markup).toContain('_spf.example.net')
    expect(markup).toContain('2 lookups')
    expect(markup).toContain('1 lookup')
    expect(markup).toContain('include:_spf.example.net')
  })

  it('renders warning badges for missing records and cycles', () => {
    const tree = makeTreeNode({
      children: [
        makeTreeNode({
          domain: 'gone.example',
          record: null,
          mechanisms: [],
          lookupCount: 0,
          missingRecord: true,
        }),
        makeTreeNode({
          domain: 'loop.example',
          record: null,
          mechanisms: [],
          lookupCount: 0,
          cycleDetected: true,
        }),
      ],
      lookupCount: 2,
    })

    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(tree),
      }),
    )

    expect(markup).toContain('No SPF record')
    expect(markup).toContain('Cycle detected')
  })

  it('renders the over-limit notice and badge when the root exceeds 10 lookups', () => {
    const tree = makeTreeNode({
      lookupCount: 12,
      exceedsLookupLimit: true,
    })

    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(tree),
      }),
    )

    expect(markup).toContain('Lookup limit exceeded')
    expect(markup).toContain('Exceeds 10-lookup limit')
    expect(markup).toContain('12 DNS lookups')
  })

  it('explains a redirect that is ignored because the record has an all', () => {
    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(
          makeTreeNode({
            record:
              'v=spf1 include:_spf.example.net redirect=other.example -all',
            ignoredRedirect: 'other.example',
          }),
        ),
      }),
    )

    expect(markup).toContain('redirect=other.example')
    expect(markup).toContain('is ignored because this record has an')
    expect(markup).toContain('RFC 7208 6.1')
  })

  it('flags macro targets as not expanded', () => {
    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(
          makeTreeNode({
            record: 'v=spf1 exists:%{ir}.%{v}._spf.example.com -all',
            mechanisms: ['exists:%{ir}.%{v}._spf.example.com'],
            macroMechanisms: ['exists:%{ir}.%{v}._spf.example.com'],
          }),
        ),
      }),
    )

    expect(markup).toContain('Macro target')
    expect(markup).toContain('not expanded')
    expect(markup).toContain('_spf.example.com')
  })

  it('renders a fallback when no tree data is available', () => {
    const markup = renderToStaticMarkup(
      React.createElement(SpfLookupTreeSection, {
        dns: makeDnsWithTree(null),
      }),
    )

    expect(markup).toContain('No SPF lookup data available.')
    expect(markup).not.toContain('<li')
  })
})
