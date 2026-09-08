import type { AttachmentResult } from '@/types/imap'
import { parseDmarcAttachmentsFromParts } from '@/utils/imap'
import type { ImapFlow } from 'imapflow'

/** Downloads the candidate MIME parts and parses the DMARC reports in them. */
export async function downloadDmarcAttachments(
  client: ImapFlow,
  uidStr: string,
  partIds: string[],
  bodyStructure: Parameters<typeof parseDmarcAttachmentsFromParts>[2],
): Promise<AttachmentResult[]> {
  const partsResult = await client.downloadMany(uidStr, partIds, { uid: true })

  return parseDmarcAttachmentsFromParts(partsResult, partIds, bodyStructure)
}
