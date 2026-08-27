import type { ImapFlow } from 'imapflow'
import { describe, expect, it, vi } from 'vitest'
import { handleMoveToTrash } from '../src/utils/imap/handleMoveToTrash'
import { handlePostProcessAndReport } from '../src/utils/imap/handlePostProcessAndReport'
import type { HandlePostProcessParams } from '../src/utils/imap/HandlePostProcessParams'

describe('move to trash after process', () => {
  const makeClient = () =>
    ({
      messageMove: vi.fn(async () => undefined),
      messageDelete: vi.fn(async () => undefined),
      messageFlagsAdd: vi.fn(async () => undefined),
    }) as unknown as ImapFlow

  const makeParams = (
    client: ImapFlow,
    overrides: Partial<HandlePostProcessParams> = {},
  ): HandlePostProcessParams => ({
    accountId: 1,
    client,
    context: 'processed',
    markAsReadAfterProcess: false,
    moveToTrashAfterProcess: true,
    postProcessAction: 'none',
    postProcessFolder: null,
    sourceFolder: 'INBOX',
    subject: 'Report Domain: example.com',
    trashPath: 'INBOX.Trash',
    uidStr: '42',
    ...overrides,
  })

  it('moves the message instead of expunging it', async () => {
    const client = makeClient()
    await handleMoveToTrash(client, makeParams(client))

    expect(client.messageMove).toHaveBeenCalledWith('42', 'INBOX.Trash', {
      uid: true,
    })
    expect(client.messageDelete).not.toHaveBeenCalled()
  })

  it('leaves the message alone when the server has no trash mailbox', async () => {
    const client = makeClient()

    await expect(
      handleMoveToTrash(client, makeParams(client, { trashPath: null })),
    ).rejects.toThrow(/\\Trash/)
    expect(client.messageMove).not.toHaveBeenCalled()
    expect(client.messageDelete).not.toHaveBeenCalled()
  })

  it('does not move a message that already sits in the trash', async () => {
    const client = makeClient()
    await handleMoveToTrash(
      client,
      makeParams(client, { sourceFolder: 'INBOX.Trash' }),
    )

    expect(client.messageMove).not.toHaveBeenCalled()
  })

  it('does not destroy the message when the move fails', async () => {
    const client = makeClient()
    vi.mocked(client.messageMove).mockRejectedValueOnce(
      new Error('NO [OVERQUOTA]'),
    )
    const logged = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    await handlePostProcessAndReport(makeParams(client))

    expect(client.messageDelete).not.toHaveBeenCalled()
    expect(logged).toHaveBeenCalled()
    logged.mockRestore()
  })

  it('reports progress with the moving_to_trash step', async () => {
    const client = makeClient()
    const onProgress = vi.fn(async () => undefined)
    await handleMoveToTrash(client, makeParams(client, { onProgress }))

    expect(onProgress).toHaveBeenCalledWith(
      expect.objectContaining({ step: 'moving_to_trash', uid: '42' }),
    )
  })
})
