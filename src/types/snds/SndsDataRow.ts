/** One parsed SNDS data row. Unknown or missing fields are null. */
export type SndsDataRow = {
  readonly ip: string
  readonly activityStart: string | null
  readonly activityEnd: string | null
  readonly rcptCommands: number | null
  readonly dataCommands: number | null
  readonly messageRecipients: number | null
  readonly filterResult: string | null
  /** Fraction, e.g. 0.001 for 0.1%. */
  readonly complaintRate: number | null
  readonly trapPeriodStart: string | null
  readonly trapPeriodEnd: string | null
  readonly trapHits: number | null
  readonly sampleHelo: string | null
  readonly sampleMailFrom: string | null
  readonly comments: string | null
  /** The source row, serialized as returned. */
  readonly raw: string
}
