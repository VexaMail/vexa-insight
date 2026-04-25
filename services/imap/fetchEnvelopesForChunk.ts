import type { FetchMessageObject, ImapFlow } from 'imapflow'

export async function fetchEnvelopesForChunk(
  client: ImapFlow,
  chunk: number[],
): Promise<FetchMessageObject[]> {
  const fetchQuery = chunk.join(',')
  const envMessages: FetchMessageObject[] = []
  for await (const msg of client.fetch(
    fetchQuery,
    { envelope: true, uid: true },
    { uid: true },
  )) {
    envMessages.push(msg)
  }
  return envMessages
}
