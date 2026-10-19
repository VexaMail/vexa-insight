import { getDb, issueEvents, runMigrations } from '@/lib/db'
import { getIssueStates, recordIssueEvent } from '@/services/issues'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const KEY = 'compliance_low:example.com'
const ACTOR = { id: 'u1', name: 'operator' }

describe('issue states', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    getDb().delete(issueEvents).run()
  })

  it('has no state until someone acts', async () => {
    expect((await getIssueStates([KEY])).get(KEY)).toBeUndefined()
  })

  it('keeps the last action and the last note', async () => {
    await recordIssueEvent(
      {
        issueKey: KEY,
        action: 'acknowledge',
        note: 'forwarders',
        actor: ACTOR,
      },
      1_000_000,
    )
    await recordIssueEvent(
      {
        issueKey: KEY,
        action: 'note',
        note: 'asked the list owner',
        actor: ACTOR,
      },
      2_000_000,
    )
    expect((await getIssueStates([KEY], 3_000_000)).get(KEY)).toMatchObject({
      status: 'acknowledged',
      lastNote: 'asked the list owner',
      actorName: 'operator',
      updatedAt: 1000,
    })
  })

  it('returns a snoozed issue to open once the snooze runs out', async () => {
    await recordIssueEvent(
      { issueKey: KEY, action: 'snooze', snoozedUntil: 5000, actor: null },
      1_000_000,
    )
    expect((await getIssueStates([KEY], 4_000_000)).get(KEY)?.status).toBe(
      'snoozed',
    )
    expect((await getIssueStates([KEY], 6_000_000)).get(KEY)).toMatchObject({
      status: 'open',
      snoozedUntil: null,
    })
  })
})
