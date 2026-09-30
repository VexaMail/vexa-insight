/**
 * Columns of an SNDS data report, in order. The REST API answers with CSV in
 * the same layout as the old per-IP CSV export, without a header row.
 */
export const SNDS_DATA_CSV_COLUMNS: readonly string[] = [
  'IP Address',
  'Activity start',
  'Activity end',
  'RCPT commands',
  'DATA commands',
  'Message recipients',
  'Filter result',
  'Complaint rate',
  'Trap message period start',
  'Trap message period end',
  'Spam trap hits',
  'Sample HELO',
  'Sample MAIL FROM',
  'Sample comments',
]
