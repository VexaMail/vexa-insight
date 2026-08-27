import type { DkimKeyAssessment } from '@/types/diagnostics'
import { decodeBase64ByteLength } from './decodeBase64ByteLength'

export function assessDkimKeyStrength(
  keyType: string,
  publicKeyBase64: string,
): DkimKeyAssessment {
  // RSA p= values are SubjectPublicKeyInfo DER, whose fixed structures add
  // roughly this many bytes on top of the modulus itself.
  const rsaSpkiOverheadBytes = 38
  const ed25519KeyBytes = 32

  const errors: string[] = []
  const byteLength = decodeBase64ByteLength(publicKeyBase64)

  if (keyType === 'ed25519') {
    if (byteLength !== ed25519KeyBytes) {
      errors.push(
        `Unexpected Ed25519 key size (${String(byteLength)} bytes; expected ${String(ed25519KeyBytes)}).`,
      )
    }
    return { keyLengthBits: byteLength * 8, errors }
  }

  const modulusBits = Math.max(0, (byteLength - rsaSpkiOverheadBytes) * 8)
  const keyLengthBits = Math.round(modulusBits / 256) * 256

  if (keyLengthBits < 1024) {
    errors.push(
      `Key length is approximately ${String(keyLengthBits)} bits. Minimum recommended is 1024 bits.`,
    )
  } else if (keyLengthBits < 2048) {
    errors.push(
      `Key length is approximately ${String(keyLengthBits)} bits. 2048 bits or higher is recommended for better security.`,
    )
  }

  return { keyLengthBits, errors }
}
