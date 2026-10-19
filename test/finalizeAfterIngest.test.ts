import type { ImapAccountConfig } from '@/types/config'
import type { AttachmentResult } from '@/types/imap'
import type { IngestOneAttachmentResult } from '@/types/reports'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const MESSAGE_ID = '<report-1@example.com>'
const UID = 42

const ingestOneAttachment =
  vi.fn<(att: AttachmentResult) => Promise<IngestOneAttachmentResult>>()
const messageMove = vi.fn(async () => Promise.resolve(undefined))
const messageFlagsAdd = vi.fn(async () => Promise.resolve(undefined))

const fakeClient = {
  connect: vi.fn(async () => Promise.resolve(undefined)),
  logout: vi.fn(async () => Promise.resolve(undefined)),
  list: vi.fn(async () =>
    Promise.resolve([
      { path: 'INBOX' },
      { path: 'INBOX.Trash', specialUse: '\\Trash' },
    ]),
  ),
  getMailboxLock: vi.fn(async () => Promise.resolve({ release: vi.fn() })),
  search: vi.fn(async () => Promise.resolve([UID])),
  // `for await` accepts a plain iterable, which stands in for ImapFlow's
  // async generator of envelopes.
  fetch: () => [
    {
      uid: UID,
      envelope: {
        messageId: MESSAGE_ID,
        subject: 'Report Domain: example.com',
        date: new Date('2026-01-15T12:00:00Z'),
      },
      bodyStructure: {
        type: 'application/zip',
        partId: '2',
        parameters: { name: 'example.com!example.org!1!2.zip' },
      },
    },
  ],
  messageMove,
  messageFlagsAdd,
}

vi.mock('@/services/reports', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  ingestOneAttachment,
}))
vi.mock('../src/services/imap/createClient', () => ({
  createClient: () => fakeClient,
}))
vi.mock('../src/services/imap/downloadDmarcAttachments', () => ({
  downloadDmarcAttachments: vi.fn(async () =>
    Promise.resolve([
      { buffer: Buffer.from('zip'), filename: 'example.com.zip' },
    ]),
  ),
}))

describe('a report message is finalized only after its reports ingest', () => {
  let accountId = 0

  const account = (): ImapAccountConfig => ({
    id: accountId,
    server: 'imap.example.com',
    port: 993,
    username: 'dmarc@example.com',
    password: 'secret',
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    postProcessAction: 'none',
    postProcessFolder: null,
    moveToTrashAfterProcess: true,
    markAsReadAfterProcess: true,
  })

  const hooks = (
    onEmailProgress = vi.fn(async () => Promise.resolve(undefined)),
  ) => ({
    onEmailProgress,
    postProcessAction: 'none',
    postProcessFolder: null,
    fetchIncludeTrash: false,
    fetchIncludeAllFolders: false,
    moveToTrashAfterProcess: true,
    markAsReadAfterProcess: true,
  })

  const isRecorded = async (): Promise<boolean> => {
    const { getProcessedMessageIdsByMessageIds } =
      await import('@/services/processed-messages')
    const ids = await getProcessedMessageIdsByMessageIds(accountId, [
      MESSAGE_ID,
    ])
    return ids.has(MESSAGE_ID)
  }

  beforeAll(async () => {
    setupTestDb()
    const { getDb, imapAccounts, runMigrations } = await import('@/lib/db')
    runMigrations()
    const rows = getDb()
      .insert(imapAccounts)
      .values({ label: 'test' })
      .returning({ id: imapAccounts.id })
      .all()
    accountId = rows[0]?.id ?? 0
  })

  beforeEach(async () => {
    const { getDb, processedMessages } = await import('@/lib/db')
    getDb().delete(processedMessages).run()
    ingestOneAttachment.mockReset()
    messageMove.mockClear()
    messageFlagsAdd.mockClear()
  })

  it('records and post-processes a message whose report ingested', async () => {
    ingestOneAttachment.mockResolvedValue({ ingested: true })
    const { runFetchAndIngest } = await import('@/services/imap')

    const result = await runFetchAndIngest(7, account(), hooks())

    expect(result).toMatchObject({ ingested: 1, errors: [] })
    expect(await isRecorded()).toBe(true)
    expect(messageMove).toHaveBeenCalledWith(String(UID), 'INBOX.Trash', {
      uid: true,
    })
    expect(messageFlagsAdd).toHaveBeenCalled()
  })

  it('leaves a message unrecorded and in place when ingest fails', async () => {
    ingestOneAttachment.mockResolvedValue({
      ingested: false,
      error: 'example.com.zip: database is locked',
    })
    const onEmailProgress = vi.fn(async () => Promise.resolve(undefined))
    const { runFetchAndIngest } = await import('@/services/imap')

    const result = await runFetchAndIngest(7, account(), hooks(onEmailProgress))

    expect(await isRecorded()).toBe(false)
    expect(messageMove).not.toHaveBeenCalled()
    expect(messageFlagsAdd).not.toHaveBeenCalled()
    expect(result.ingested).toBe(0)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]).toContain(MESSAGE_ID)
    expect(result.errors[0]).toContain('example.com.zip: database is locked')
    expect(onEmailProgress).toHaveBeenCalledWith(
      expect.objectContaining({ step: 'error', uid: String(UID) }),
    )
    expect(onEmailProgress).not.toHaveBeenCalledWith(
      expect.objectContaining({ step: 'done' }),
    )
  })

  it('leaves a message in place when ingest throws', async () => {
    ingestOneAttachment.mockRejectedValue(new Error('disk I/O error'))
    const { runFetchAndIngest } = await import('@/services/imap')

    const result = await runFetchAndIngest(7, account(), hooks())

    expect(await isRecorded()).toBe(false)
    expect(messageMove).not.toHaveBeenCalled()
    expect(result.errors).toEqual(
      expect.arrayContaining([expect.stringContaining('disk I/O error')]),
    )
  })

  it('records and post-processes a message whose report was a duplicate', async () => {
    ingestOneAttachment.mockResolvedValue({ ingested: false })
    const { runFetchAndIngest } = await import('@/services/imap')

    const result = await runFetchAndIngest(7, account(), hooks())

    expect(result).toMatchObject({ ingested: 0, skipped: 1, errors: [] })
    expect(await isRecorded()).toBe(true)
    expect(messageMove).toHaveBeenCalledTimes(1)
  })
})
