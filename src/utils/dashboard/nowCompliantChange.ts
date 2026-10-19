import { COMPLIANT_PASS_RATE } from '@/constants/dashboard'
import type { ChangeItem, DomainPeriodTotals } from '@/types/dashboard'
import { domainHref } from './domainHref'
import { judgedPassRate } from './judgedPassRate'
import { nameList } from './nameList'

/** Domains below the compliant band last period and inside it now. */
export function nowCompliantChange(
  domains: DomainPeriodTotals[],
): ChangeItem | null {
  const fixed = domains.filter((d) => {
    const now = judgedPassRate(d.current)
    const before = judgedPassRate(d.previous)
    return (
      now !== null &&
      before !== null &&
      before < COMPLIANT_PASS_RATE &&
      now >= COMPLIANT_PASS_RATE
    )
  })
  const first = fixed[0]
  if (!first) return null
  return {
    id: 'now-compliant',
    value: String(fixed.length),
    title: `${fixed.length === 1 ? 'Domain' : 'Domains'} now compliant`,
    detail: nameList(fixed.map((d) => d.domainName)),
    direction: 'better',
    href: fixed.length === 1 ? domainHref(first.domainName) : '/domains',
    domainNames: fixed.map((d) => d.domainName),
  }
}
