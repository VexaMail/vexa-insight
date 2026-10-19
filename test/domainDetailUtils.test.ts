import type { DomainSourceRow, PublishedDmarcPolicy } from '@/types/domains'
import {
  deriveEnforcementStages,
  describeAuthRate,
  matchesSourceClass,
  parsePolicyPublished,
} from '@/utils/domains'
import { describe, expect, it } from 'vitest'

const POLICY_XML =
  '<feedback><report_metadata><org_name>example.com</org_name></report_metadata>' +
  '<policy_published><domain>example.com</domain><adkim>r</adkim><aspf>s</aspf>' +
  '<p>quarantine</p><sp>none</sp><pct>50</pct></policy_published><record/></feedback>'

function policy(
  p: string | null,
  pct: number | null = null,
): PublishedDmarcPolicy {
  return {
    policy: p,
    subdomainPolicy: null,
    pct,
    adkim: null,
    aspf: null,
    reportedAt: 0,
    reporter: 'example.com',
  }
}

function row(failing: number, kind: DomainSourceRow['kind']): DomainSourceRow {
  return { sourceIp: '192.0.2.1', count: 10, auth: null, failing, kind }
}

describe('parsePolicyPublished', () => {
  it('reads the tags from the policy_published block only', () => {
    expect(parsePolicyPublished(POLICY_XML)).toEqual({
      policy: 'quarantine',
      subdomainPolicy: 'none',
      pct: 50,
      adkim: 'r',
      aspf: 's',
    })
  })

  it('returns nulls when the block is missing', () => {
    expect(
      parsePolicyPublished('<feedback><p>reject</p></feedback>').policy,
    ).toBeNull()
  })
})

describe('deriveEnforcementStages', () => {
  const current = (stages: ReturnType<typeof deriveEnforcementStages>) =>
    stages.find((s) => s.state === 'current')?.key

  it('observes while there is too little data', () => {
    expect(
      current(deriveEnforcementStages(policy('none'), 'insufficient-data')),
    ).toBe('observe')
  })

  it('asks to fix legitimate senders whatever the policy', () => {
    expect(
      current(deriveEnforcementStages(policy('reject'), 'fix-first')),
    ).toBe('fix')
  })

  it('points a ready monitoring domain at quarantine', () => {
    expect(current(deriveEnforcementStages(policy('none'), 'ready'))).toBe(
      'quarantine',
    )
  })

  it('marks every step done at p=reject with full coverage', () => {
    const stages = deriveEnforcementStages(policy('reject'), 'ready')
    expect(stages.every((s) => s.state === 'done')).toBe(true)
  })

  it('keeps quarantine current while pct is below 100', () => {
    expect(
      current(deriveEnforcementStages(policy('quarantine', 25), 'ready')),
    ).toBe('quarantine')
  })
})

describe('describeAuthRate', () => {
  it('reads all, none and part of the messages', () => {
    expect(describeAuthRate(5, 5).label).toBe('Pass')
    expect(describeAuthRate(0, 5).label).toBe('Fail')
    expect(describeAuthRate(3, 4)).toMatchObject({
      tone: 'warning',
      label: '75.0%',
    })
    expect(describeAuthRate(0, 0).tone).toBe('unknown')
  })
})

describe('matchesSourceClass', () => {
  it('only lists failing sources under a reading', () => {
    expect(matchesSourceClass(row(0, 'legitimate'), 'legitimate')).toBe(false)
    expect(matchesSourceClass(row(2, 'legitimate'), 'legitimate')).toBe(true)
    expect(matchesSourceClass(row(2, 'forwarded'), 'failing')).toBe(true)
    expect(matchesSourceClass(row(0, 'unknown'), 'all')).toBe(true)
  })
})
