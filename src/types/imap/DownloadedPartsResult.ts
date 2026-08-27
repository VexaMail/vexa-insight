/**
 * Minimal type for result of ImapFlow downloadMany (partId -> part data).
 */
export type DownloadedPartsResult = {
  [partId: string]:
    | {
        content?: Buffer | null
        meta?: { filename?: string }
      }
    | undefined
}
