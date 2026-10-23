import type { DkimKeyAssessment } from '@/types/diagnostics'
import { assessDkimRsaKeyStrength } from './assessDkimRsaKeyStrength'
import { decodeBase64ByteLength } from './decodeBase64ByteLength'

export function assessDkimKeyStrength(
  keyType: string,
  publicKeyBase64: string,
): DkimKeyAssessment {
  const ed25519KeyBytes = 32
  const errors: string[] = []
  const warnings: string[] = []
  const compact = publicKeyBase64.replace(/\s/g, '')
  if (
    !/^[a-z0-9+/]+={0,2}$/i.test(compact) ||
    Buffer.from(compact, 'base64').toString('base64').replace(/=+$/, '') !==
      compact.replace(/=+$/, '')
  ) {
    return {
      keyLengthBits: null,
      errors: ['Public key is not valid base64.'],
      warnings,
    }
  }
  const byteLength = decodeBase64ByteLength(compact)

  if (keyType === 'ed25519') {
    if (byteLength !== ed25519KeyBytes) {
      errors.push(
        `Unexpected Ed25519 key size (${String(byteLength)} bytes; expected ${String(ed25519KeyBytes)}).`,
      )
    }
    return { keyLengthBits: byteLength * 8, errors, warnings }
  }
  if (keyType !== 'rsa') {
    return {
      keyLengthBits: null,
      errors: [`Unsupported key type: "${keyType}".`],
      warnings,
    }
  }
  return assessDkimRsaKeyStrength(compact)
}
