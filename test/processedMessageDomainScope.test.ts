import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertSeedDomains } from './setup/insertSeedDomains'
import { insertSeedEvents } from './setup/insertSeedEvents'
import { insertSeedIp } from './setup/insertSeedIp'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

describe('processed-message reads honour the per-user domain allow-list', () => {
  const BEGIN_UNIX = Math.floor(
    new Date('2026-01-01T00:00:00Z').getTime() / 1000,
  )
  const END_UNIX = Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000)
  const NOW = new Date('2026-01-15T12:00:00Z')
  const MESSAGE_A = '<report-a@example.com>'
  const MESSAGE_B = '<report-b@example.com>'
  const MESSAGE_NO_REPORT = '<no-report@example.com>'
  const XML_A = '<feedback><report_metadata>a</report_metadata></feedback>'
  const XML_B = '<feedback><report_metadata>b</report_metadata></feedback>'

  /** Inserts a raw report ingested from `messageId` and returns its PK. */
  const insertReportFromMessage = async (
    messageId: string,
    rawXml: string,
  ): Promise<number> => {
    const { getDb, rawReports } = await import('@/lib/db')
    const rows = getDb()
      .insert(rawReports)
      .values({
        reportId: `report-${messageId}`,
        orgName: 'test-org',
        beginDate: BEGIN_UNIX,
        endDate: END_UNIX,
        rawXml,
        sourceMessageId: messageId,
        ingestedAt: NOW,
      })
      .returning({ id: rawReports.id })
      .all()
    const id = rows[0]?.id
    if (id == null) throw new Error('insert report failed')
    return id
  }

  /** Records `messageIds` as processed by one IMAP account. */
  const insertProcessedMessages = async (
    messageIds: string[],
  ): Promise<void> => {
    const { getDb, imapAccounts, processedMessages } = await import('@/lib/db')
    const db = getDb()
    const accounts = db
      .insert(imapAccounts)
      .values({ label: 'test' })
      .returning({ id: imapAccounts.id })
      .all()
    const imapAccountId = accounts[0]?.id
    if (imapAccountId == null) throw new Error('insert imap account failed')
    for (const messageId of messageIds) {
      db.insert(processedMessages)
        .values({ imapAccountId, messageId, processedAt: NOW })
        .run()
    }
  }

  /**
   * Seeds two domains and one report for each: message A's report belongs to
   * domain 0 and message B's to domain 1. A third processed message never
   * produced a report. Returns the two domain ids.
   */
  const seedScopedReports = async (): Promise<number[]> => {
    const domainIds = insertSeedDomains(2, NOW)
    const ipId = insertSeedIp(NOW)
    const reportA = await insertReportFromMessage(MESSAGE_A, XML_A)
    const reportB = await insertReportFromMessage(MESSAGE_B, XML_B)
    const seedEvent = (rawReportId: number, domainId: number): void => {
      insertSeedEvents({
        rawReportId,
        domainId,
        ipId,
        eventsPerReport: 1,
        beginUnix: BEGIN_UNIX,
        endUnix: END_UNIX,
        now: NOW,
      })
    }
    const [domainA, domainB] = domainIds
    if (domainA === undefined || domainB === undefined) {
      throw new Error('fixture produced fewer than two domains')
    }
    seedEvent(reportA, domainA)
    seedEvent(reportB, domainB)
    await insertProcessedMessages([MESSAGE_A, MESSAGE_B, MESSAGE_NO_REPORT])
    return domainIds
  }

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    const { getDb, imapAccounts, processedMessages } = await import('@/lib/db')
    const db = getDb()
    db.delete(processedMessages).run()
    db.delete(imapAccounts).run()
    resetDmarcDb()
    const { getAllowedDomainIds } = await import('@/services/auth')
    vi.mocked(getAllowedDomainIds).mockResolvedValue(null)
  })

  describe('getProcessedMessageContent', () => {
    it('returns the XML to an unrestricted caller', async () => {
      const { getProcessedMessageContent } =
        await import('@/services/processed-messages')
      await seedScopedReports()

      expect(await getProcessedMessageContent(MESSAGE_A)).toBe(XML_A)
      expect(await getProcessedMessageContent(MESSAGE_B)).toBe(XML_B)
      expect(await getProcessedMessageContent(MESSAGE_NO_REPORT)).toBeNull()
    })

    it('returns the XML when the report domain is in the allow-list', async () => {
      const { getAllowedDomainIds } = await import('@/services/auth')
      const { getProcessedMessageContent } =
        await import('@/services/processed-messages')
      const [domainA] = await seedScopedReports()
      if (domainA === undefined) throw new Error('fixture produced no domains')
      vi.mocked(getAllowedDomainIds).mockResolvedValue([domainA])

      expect(await getProcessedMessageContent(MESSAGE_A)).toBe(XML_A)
    })

    it('returns null when the report domain is outside the allow-list', async () => {
      const { getAllowedDomainIds } = await import('@/services/auth')
      const { getProcessedMessageContent } =
        await import('@/services/processed-messages')
      const [domainA] = await seedScopedReports()
      if (domainA === undefined) throw new Error('fixture produced no domains')
      vi.mocked(getAllowedDomainIds).mockResolvedValue([domainA])

      expect(await getProcessedMessageContent(MESSAGE_B)).toBeNull()
    })

    it('returns null when the caller has no domain access at all', async () => {
      const { getAllowedDomainIds } = await import('@/services/auth')
      const { getProcessedMessageContent } =
        await import('@/services/processed-messages')
      await seedScopedReports()
      vi.mocked(getAllowedDomainIds).mockResolvedValue([])

      expect(await getProcessedMessageContent(MESSAGE_A)).toBeNull()
      expect(await getProcessedMessageContent(MESSAGE_B)).toBeNull()
    })
  })

  describe('getProcessedMessages', () => {
    it('lists every processed message for an unrestricted caller', async () => {
      const { getProcessedMessages } =
        await import('@/services/processed-messages')
      await seedScopedReports()

      const rows = await getProcessedMessages()
      expect(rows.map((r) => r.messageId).sort()).toEqual(
        [MESSAGE_A, MESSAGE_B, MESSAGE_NO_REPORT].sort(),
      )
      expect(rows[0]?.accountLabel).toBe('test')
    })

    it('lists only messages whose report is in the allow-list', async () => {
      const { getAllowedDomainIds } = await import('@/services/auth')
      const { getProcessedMessages } =
        await import('@/services/processed-messages')
      const [domainA] = await seedScopedReports()
      if (domainA === undefined) throw new Error('fixture produced no domains')
      vi.mocked(getAllowedDomainIds).mockResolvedValue([domainA])

      const rows = await getProcessedMessages()
      expect(rows.map((r) => r.messageId)).toEqual([MESSAGE_A])
    })

    it('lists nothing for a caller with no domain access', async () => {
      const { getAllowedDomainIds } = await import('@/services/auth')
      const { getProcessedMessages } =
        await import('@/services/processed-messages')
      await seedScopedReports()
      vi.mocked(getAllowedDomainIds).mockResolvedValue([])

      expect(await getProcessedMessages()).toEqual([])
    })
  })
})
