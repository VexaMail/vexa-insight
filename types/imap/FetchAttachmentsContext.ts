/**
 * Context for fetchAttachments execution: since date and folder list.
 */
export type FetchAttachmentsContext = {
  since: Date
  folders: string[]
}
