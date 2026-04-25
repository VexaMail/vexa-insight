import type {
  FetchAttachmentsContext,
  FetchAttachmentsOptions,
  MailboxListItem,
} from '@/types/imap'
import { buildIngestionFolderList } from './buildIngestionFolderList'
import { getSinceDate } from './getSinceDate'

/**
 * Builds execution context for fetchAttachments: since date, folder list, and optional trash path.
 */
export function buildFetchAttachmentsContext(
  days: number,
  mailboxes: MailboxListItem[],
  options: FetchAttachmentsOptions,
): FetchAttachmentsContext {
  const since = getSinceDate(days)
  const folders = buildIngestionFolderList(mailboxes, options)
  return { since, folders }
}
