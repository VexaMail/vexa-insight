import { createPublicKey } from 'node:crypto'

/** Read the actual RSA modulus from supported DKIM public-key DER formats. */
export function readDkimRsaKeyBits(base64: string): number | null {
  for (const type of ['spki', 'pkcs1'] as const) {
    try {
      const key = createPublicKey({
        key: Buffer.from(base64, 'base64'),
        format: 'der',
        type,
      })
      if (key.asymmetricKeyType !== 'rsa') return null
      return key.asymmetricKeyDetails?.modulusLength ?? null
    } catch {
      // A provider may use either a SubjectPublicKeyInfo or RSAPublicKey.
    }
  }
  return null
}
