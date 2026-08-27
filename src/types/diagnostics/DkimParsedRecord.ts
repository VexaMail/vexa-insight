export type DkimParsedRecord = {
  selector: string
  raw: string | null
  valid: boolean
  version: string | null
  keyType: string | null
  keyLengthBits: number | null
  publicKeyPresent: boolean
  errors: string[]
}
