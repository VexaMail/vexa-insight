import type { DkimPublicKeyAssessment } from '@/types/diagnostics'
import { assessDkimKeyStrength } from './assessDkimKeyStrength'

/** Separate key presence and validity from strength recommendations. */
export function parseDkimPublicKey(
  record: string,
  keyType: string,
): DkimPublicKeyAssessment {
  const publicKeyMatch = /(?:^|;)\s*p\s*=\s*([^;]*)/.exec(record)
  const publicKeyBase64 = publicKeyMatch?.[1]?.trim() ?? ''
  if (publicKeyBase64.length === 0) {
    return {
      publicKeyPresent: false,
      keyLengthBits: null,
      errors: ['Public key (p=) is empty or revoked.'],
      warnings: [],
    }
  }
  const assessment = assessDkimKeyStrength(keyType, publicKeyBase64)
  return {
    publicKeyPresent: true,
    keyLengthBits: assessment.keyLengthBits,
    errors: assessment.errors,
    warnings: assessment.warnings,
  }
}
