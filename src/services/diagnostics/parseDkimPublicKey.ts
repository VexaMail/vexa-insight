import { assessDkimKeyStrength } from './assessDkimKeyStrength'

/** Presence, estimated length and errors of the p= tag of a DKIM record. */
export function parseDkimPublicKey(
  record: string,
  keyType: string,
): {
  publicKeyPresent: boolean
  keyLengthBits: number | null
  errors: string[]
} {
  const publicKeyMatch = /p=([^;]*)/.exec(record)
  const publicKeyBase64 = publicKeyMatch?.[1]?.trim() ?? ''
  if (publicKeyBase64.length === 0) {
    return {
      publicKeyPresent: false,
      keyLengthBits: null,
      errors: ['Public key (p=) is empty or revoked.'],
    }
  }
  const assessment = assessDkimKeyStrength(keyType, publicKeyBase64)
  return {
    publicKeyPresent: true,
    keyLengthBits: assessment.keyLengthBits,
    errors: assessment.errors,
  }
}
