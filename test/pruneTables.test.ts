import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const NOW = new Date('2026-10-19T12:00:00Z')
const DAY_MS = 86_400_000

describe('pruneTables', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { getDb, jobPollEvents, jobRuns, sessions, users } =
      await import('@/lib/db')
    const db = getDb()
    db.delete(jobPollEvents).run()
    db.delete(jobRuns).run()
    db.delete(sessions).run()
    db.delete(users).run()
  })

  it('removes expired sessions and keeps live ones', async () => {
    const { getDb, sessions, users } = await import('@/lib/db')
    const { pruneTables } = await import('@/services/retention')
    const db = getDb()
    db.insert(users)
      .values({
        id: 'u1',
        username: 'user@example.com',
        passwordHash: 'hash-placeholder',
        role: 'user',
      })
      .run()
    db.insert(sessions)
      .values([
        {
          id: 'expired',
          userId: 'u1',
          expiresAt: new Date(NOW.getTime() - DAY_MS),
        },
        {
          id: 'live',
          userId: 'u1',
          expiresAt: new Date(NOW.getTime() + DAY_MS),
        },
      ])
      .run()

    const result = pruneTables(NOW)

    const left = db.select({ id: sessions.id }).from(sessions).all()
    expect(left.map((r) => r.id)).toEqual(['live'])
    expect(result.sessions).toBe(1)
  })

  it('removes poll events older than 90 days and keeps recent ones', async () => {
    const { getDb, jobPollEvents, jobRuns } = await import('@/lib/db')
    const { pruneTables } = await import('@/services/retention')
    const db = getDb()
    const run = db
      .insert(jobRuns)
      .values({ runAt: NOW, success: true })
      .returning({ id: jobRuns.id })
      .get()
    const event = (messageUid: string, ageDays: number) => ({
      jobRunId: run.id,
      messageUid,
      step: 'fetched',
      createdAt: new Date(NOW.getTime() - ageDays * DAY_MS),
    })
    db.insert(jobPollEvents)
      .values([event('old', 91), event('recent', 89)])
      .run()

    const result = pruneTables(NOW)

    const left = db
      .select({ uid: jobPollEvents.messageUid })
      .from(jobPollEvents)
      .all()
    expect(left.map((r) => r.uid)).toEqual(['recent'])
    expect(result.pollEvents).toBe(1)
  })
})
