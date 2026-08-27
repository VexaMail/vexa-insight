import type { FetchAttachmentsOptions, MailboxListItem } from '@/types/imap'
import { hasTrashUse } from './hasTrashUse'

/**
 * Builds the ordered list of folder paths to process for ingestion (INBOX, optional Trash, optional all).
 */
export function buildIngestionFolderList(
  mailboxes: MailboxListItem[],
  options: FetchAttachmentsOptions,
): string[] {
  const paths = mailboxes.map((m) => m.path)
  const trashPath = mailboxes.find(hasTrashUse)?.path
  const folders: string[] = ['INBOX']
  if (options.fetchIncludeTrash && trashPath) {
    folders.push(trashPath)
  }
  if (options.fetchIncludeAllFolders) {
    for (const p of paths) {
      if (p !== 'INBOX' && p !== trashPath && !folders.includes(p)) {
        folders.push(p)
      }
    }
  }
  return folders
}
