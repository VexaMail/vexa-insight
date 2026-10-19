import type { AlertRule } from '@/types/alerts'
import { matchAlertRule } from '@/utils/alerts'
import { describe, expect, it } from 'vitest'

const BASE: AlertRule = {
  id: 1,
  name: 'drop',
  kind: 'compliance_drop',
  domainName: null,
  threshold: 10,
  windowDays: 7,
  minMessages: 100,
  enabled: true,
  lastFiredAt: null,
}
const A = 'a.example.com'
const B = 'b.example.com'

describe('matchAlertRule', () => {
  const previous = new Map([
    [A, { total: 1000, aligned: 950 }],
    [B, { total: 1000, aligned: 900 }],
  ])
  const current = new Map([
    [A, { total: 1000, aligned: 800 }],
    [B, { total: 1000, aligned: 850 }],
  ])

  it('fires a drop rule for domains that fell by the threshold', () => {
    expect(matchAlertRule(BASE, current, previous)).toEqual([
      { domain: A, currentRate: 80, previousRate: 95, messages: 1000 },
    ])
  })

  it('fires a floor rule, scoped to one domain', () => {
    const rule: AlertRule = {
      ...BASE,
      kind: 'compliance_below',
      threshold: 90,
      domainName: B,
    }
    expect(matchAlertRule(rule, current, previous)).toEqual([
      { domain: B, currentRate: 85, previousRate: null, messages: 1000 },
    ])
  })

  it('skips windows under the minimum volume', () => {
    const quiet = new Map([[A, { total: 50, aligned: 0 }]])
    expect(matchAlertRule(BASE, quiet, previous)).toEqual([])
    expect(
      matchAlertRule(
        { ...BASE, kind: 'compliance_below', threshold: 99 },
        quiet,
        previous,
      ),
    ).toEqual([])
  })
})
