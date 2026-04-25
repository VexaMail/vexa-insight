/**
 * Minimal client interface for moving a message to a mailbox (e.g. Trash).
 */
export type MessageMoveClient = {
  messageMove(
    uid: string,
    path: string,
    opts: { uid: boolean },
  ): Promise<unknown>
}
