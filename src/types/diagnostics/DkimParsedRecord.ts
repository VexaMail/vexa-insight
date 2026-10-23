export type DkimParsedRecord = {
  selector: string
  raw: string | null
  valid: boolean
  version: string | null
  keyType: string | null
  keyLengthBits: number | null
  publicKeyPresent: boolean
  errors: string[]
  /** Optional for diagnostic snapshots saved before strength warnings existed. */
  warnings?: string[]
}
