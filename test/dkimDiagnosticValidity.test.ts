import { describe, expect, it } from 'vitest'
import { parseDkimRecord } from '../src/services/diagnostics/parseDkimRecord'
import { scoreDkim } from '../src/services/diagnostics/scoreDkim'
import { buildDkimFinding } from '../src/utils/diagnostics/buildDkimFinding'
import { dkimRsa1024PublicKey } from './setup/dkimRsa1024PublicKey'
import { makeDnsDiagnostics } from './setup/makeDnsDiagnostics'

describe('DKIM validity across diagnostics views', () => {
  it('keeps RSA-1024 valid with a separate recommendation and full DKIM credit', () => {
    const probe = {
      selector: 'k1',
      record: `v=DKIM1; p=${dkimRsa1024PublicKey}`,
      valid: true,
    }
    const parsed = parseDkimRecord(probe)
    const dns = makeDnsDiagnostics({
      dkim: [probe],
      dkimParsedRecords: [parsed],
    })
    expect(parsed.valid).toBe(true)
    expect(parsed.errors).toEqual([])
    expect(parsed.warnings).toHaveLength(1)
    expect(buildDkimFinding(dns)).toMatchObject({
      severity: 'low',
      tileValue: 'Valid',
    })
    expect(scoreDkim(dns).earned).toBe(25)
  })

  it('does not label an Ed25519 key as weak RSA', () => {
    const probe = {
      selector: 'ed',
      record: `v=DKIM1; k=ed25519; p=${Buffer.alloc(32).toString('base64')}`,
      valid: true,
    }
    const dns = makeDnsDiagnostics({
      dkim: [probe],
      dkimParsedRecords: [parseDkimRecord(probe)],
    })
    expect(buildDkimFinding(dns)).toMatchObject({
      severity: 'pass',
      tileValue: 'Valid',
    })
    expect(scoreDkim(dns).earned).toBe(25)
  })

  it('does not grant score credit to a revoked key even if the initial probe had accepted it', () => {
    const probe = { selector: 'old', record: 'v=DKIM1; p=', valid: true }
    const dns = makeDnsDiagnostics({
      dkim: [probe],
      dkimParsedRecords: [parseDkimRecord(probe)],
    })
    expect(buildDkimFinding(dns).tileValue).toBe('Invalid')
    expect(scoreDkim(dns).earned).toBe(0)
  })

  it('does not make unsuccessful common-selector discovery a high-severity signing incident', () => {
    const probe = { selector: 'default', record: null, valid: false }
    const dns = makeDnsDiagnostics({
      dkim: [probe],
      dkimParsedRecords: [parseDkimRecord(probe)],
    })
    expect(buildDkimFinding(dns).severity).toBe('info')
    expect(buildDkimFinding(dns).detail).toContain('another selector')
  })

  it('keeps a missing selector observed in real reports actionable', () => {
    const probe = {
      selector: 'actual',
      record: null,
      valid: false,
      fromReports: true,
    }
    const dns = makeDnsDiagnostics({
      dkim: [probe],
      dkimParsedRecords: [parseDkimRecord(probe)],
    })
    expect(buildDkimFinding(dns).severity).toBe('high')
  })
})
