import type { ImapFlow } from 'imapflow'
import { describe, expect, it, vi } from 'vitest'
import { handleMoveToTrash } from '../src/utils/imap/handleMoveToTrash'
import { handlePostProcessAndReport } from '../src/utils/imap/handlePostProcessAndReport'
import type { HandlePostProcessParams } from '../src/utils/imap/HandlePostProcessParams'

describe('move to trash after process', () => {
  const makeClient = () => {
    const messageMove = vi.fn(() => Promise.resolve(undefined))
    const messageDelete = vi.fn(() => Promise.resolve(undefined))
    const messageFlagsAdd = vi.fn(() => Promise.resolve(undefined))
    const client = {
      messageMove,
      messageDelete,
      messageFlagsAdd,
    } as unknown as ImapFlow
    return { client, messageMove, messageDelete }
  }

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
    const { client, messageMove, messageDelete } = makeClient()
    await handleMoveToTrash(client, makeParams(client))

    expect(messageMove).toHaveBeenCalledWith('42', 'INBOX.Trash', {
      uid: true,
    })
    expect(messageDelete).not.toHaveBeenCalled()
  })

  it('leaves the message alone when the server has no trash mailbox', async () => {
    const { client, messageMove, messageDelete } = makeClient()

    await expect(
      handleMoveToTrash(client, makeParams(client, { trashPath: null })),
    ).rejects.toThrow(/\\Trash/)
    expect(messageMove).not.toHaveBeenCalled()
    expect(messageDelete).not.toHaveBeenCalled()
  })

  it('does not move a message that already sits in the trash', async () => {
    const { client, messageMove } = makeClient()
    await handleMoveToTrash(
      client,
      makeParams(client, { sourceFolder: 'INBOX.Trash' }),
    )

    expect(messageMove).not.toHaveBeenCalled()
  })

  it('does not destroy the message when the move fails', async () => {
    const { client, messageMove, messageDelete } = makeClient()
    messageMove.mockRejectedValueOnce(new Error('NO [OVERQUOTA]'))
    const logged = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined)

    await handlePostProcessAndReport(makeParams(client))

    expect(messageDelete).not.toHaveBeenCalled()
    expect(logged).toHaveBeenCalled()
    logged.mockRestore()
  })

  it('reports progress with the moving_to_trash step', async () => {
    const { client } = makeClient()
    const onProgress = vi.fn(() => Promise.resolve(undefined))
    await handleMoveToTrash(client, makeParams(client, { onProgress }))

    expect(onProgress).toHaveBeenCalledWith(
      expect.objectContaining({ step: 'moving_to_trash', uid: '42' }),
    )
  })
})
