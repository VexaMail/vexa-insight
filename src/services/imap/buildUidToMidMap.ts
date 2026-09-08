import type { UidInfo } from '@/types/imap'
import { envelopeDateToIso } from '@/utils/imap'
import type { FetchMessageObject } from 'imapflow'

export function buildUidToMidMap(envMessages: FetchMessageObject[]): {
  uidToMidMap: Map<number, UidInfo>
  messageIdsToLookup: string[]
} {
  const uidToMidMap = new Map<number, UidInfo>()
  const messageIdsToLookup: string[] = []

  for (const msg of envMessages) {
    const msgUid = msg.uid
    const envelope = msg.envelope
    const messageId = envelope?.messageId ?? null
    const mid = messageId ?? `uid:${String(msgUid)}`
    const date = envelopeDateToIso(envelope?.date)
    const subject = envelope?.subject

    uidToMidMap.set(msgUid, {
      mid,
      ...(date !== undefined && { date }),
      ...(subject !== undefined && { subject }),
      env: msg,
    })
    messageIdsToLookup.push(mid)
  }

  return { uidToMidMap, messageIdsToLookup }
}
