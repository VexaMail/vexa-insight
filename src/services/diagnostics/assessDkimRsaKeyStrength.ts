import type { DkimKeyAssessment } from '@/types/diagnostics'
import { readDkimRsaKeyBits } from './readDkimRsaKeyBits'

/** Separate the RSA minimum from the recommended rotation threshold. */
export function assessDkimRsaKeyStrength(base64: string): DkimKeyAssessment {
  const keyLengthBits = readDkimRsaKeyBits(base64)
  const errors: string[] = []
  const warnings: string[] = []
  if (keyLengthBits === null) {
    return {
      keyLengthBits,
      errors: ['Public key is not a valid RSA public key.'],
      warnings,
    }
  }
  if (keyLengthBits < 1024) {
    errors.push(
      `RSA key length is ${String(keyLengthBits)} bits. At least 1024 bits are required.`,
    )
  } else if (keyLengthBits < 2048) {
    warnings.push(
      `RSA key length is ${String(keyLengthBits)} bits. 2048 bits or higher is recommended for better security.`,
    )
  }
  return { keyLengthBits, errors, warnings }
}
