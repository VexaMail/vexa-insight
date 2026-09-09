import type { FetchMessageObject, ImapFlow } from 'imapflow'

/** The envelope-and-structure fetch, skipped when the caller already has it. */
export async function fetchEnvelopeMessage(
  client: ImapFlow,
  uidStr: string,
  providedEnvMsg: FetchMessageObject | undefined,
): Promise<FetchMessageObject | false> {
  return (
    providedEnvMsg ??
    (await client.fetchOne(
      uidStr,
      { envelope: true, bodyStructure: true, uid: true },
      { uid: true },
    ))
  )
}
