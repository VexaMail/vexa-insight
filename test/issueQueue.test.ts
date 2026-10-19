import type { ActionItem } from '@/types/dashboard'
import type { IssueState } from '@/types/issues'
import { filterIssues, toQueuedIssue } from '@/utils/dashboard'
import { issueKeyDomain } from '@/utils/issues'
import { describe, expect, it } from 'vitest'

const item: ActionItem = {
  id: 'source:example.com:2001:db8::1',
  severity: 'warning',
  subject: '2001:db8::1',
  issue: 'New failing source',
  detail: '10 of 10 messages for example.com fail DMARC',
  impactMessages: 10,
  impactRate: 100,
  lastSeenAt: 1,
  isNew: true,
  href: '/ips/2001:db8::1',
}

const state = (status: IssueState['status']): IssueState => ({
  issueKey: item.id,
  status,
  snoozedUntil: status === 'snoozed' ? 2_000_000_000 : null,
  lastNote: null,
  actorName: 'operator',
  updatedAt: 1,
})

const open = { canWrite: true, allowedDomains: null }

describe('issue queue', () => {
  it('keeps the domain in the second key segment, even for IPv6 sources', () => {
    expect(issueKeyDomain(item.id)).toBe('example.com')
  })

  it('maps operator states onto the queue', () => {
    expect(toQueuedIssue(item, undefined, open).state).toBe('active')
    expect(toQueuedIssue(item, state('acknowledged'), open).state).toBe(
      'acknowledged',
    )
    const snoozed = toQueuedIssue(item, state('snoozed'), open)
    expect(snoozed).toMatchObject({ state: 'snoozed', actedBy: 'operator' })
    expect(toQueuedIssue(item, state('resolved'), open).state).toBe('active')
  })

  it('only offers actions the events API accepts', () => {
    const viewer = { canWrite: false, allowedDomains: null }
    expect(toQueuedIssue(item, undefined, viewer).canAct).toBe(false)
    const scoped = { canWrite: true, allowedDomains: new Set(['example.org']) }
    expect(toQueuedIssue(item, undefined, scoped).canAct).toBe(false)
    const own = { canWrite: true, allowedDomains: new Set(['example.com']) }
    expect(toQueuedIssue(item, undefined, own).canAct).toBe(true)
  })

  it('filters by severity, state and text', () => {
    const issues = [
      toQueuedIssue(item, undefined, open),
      toQueuedIssue(
        { ...item, id: 'silent:example.net', subject: 'example.net' },
        state('snoozed'),
        open,
      ),
    ]
    const all = { severity: 'all', state: 'all', query: '' } as const
    expect(filterIssues(issues, all)).toHaveLength(2)
    expect(filterIssues(issues, { ...all, state: 'snoozed' })).toHaveLength(1)
    expect(filterIssues(issues, { ...all, severity: 'critical' })).toEqual([])
    expect(filterIssues(issues, { ...all, query: 'EXAMPLE.COM' })).toHaveLength(
      1,
    )
  })
})
