import type { FetchMessageObject, ImapFlow } from 'imapflow'

export async function getBodyStructure(
  client: ImapFlow,
  uidStr: string,
  envMsg: FetchMessageObject,
) {
  if (envMsg.bodyStructure) return envMsg.bodyStructure
  const fullMsg = await client.fetchOne(
    uidStr,
    { bodyStructure: true, uid: true },
    { uid: true },
  )
  if (!fullMsg) return null
  return fullMsg.bodyStructure ?? null
}
