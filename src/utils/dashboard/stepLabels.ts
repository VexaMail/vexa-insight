/**
 * Human-readable labels for email progress step keys.
 */
export const EMAIL_PROGRESS_STEP_LABELS: Record<string, string> = {
  downloading: 'Downloading',
  dmarc_detected: 'DMARC detected',
  processing_records: 'Processing records',
  moving_to_folder: 'Moving to folder',
  moving_to_trash: 'Moving to trash',
  marking_read: 'Marking as read',
  done: 'Done',
  error: 'Error',
  already_processed: 'Already processed',
}
