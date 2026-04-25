/**
 * Payload for onEmailProgress callback during fetch/ingest.
 */
export type EmailProgressPayload = {
  accountId: number
  emailDate?: string | undefined
  error?: string | undefined
  step:
    | 'downloading'
    | 'dmarc_detected'
    | 'processing_records'
    | 'moving_to_trash' // Keeps legacy but also represents generic delete concepts occasionally if needed
    | 'marking_read'
    | 'moving_to_folder'
    | 'done'
    | 'error'
    | 'already_processed'
  subject?: string | undefined
  uid: string
}
