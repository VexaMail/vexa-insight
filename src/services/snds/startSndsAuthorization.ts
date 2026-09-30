import { encryptSecret } from '@/services/crypto'
import { buildSndsAuthorizeUrl, createPkcePair } from '@/utils/snds'
import { saveSndsConnection } from './saveSndsConnection'

/**
 * Begins connecting SNDS: keeps a fresh PKCE verifier, encrypted, and returns
 * the Microsoft sign-in URL the admin opens.
 */
export function startSndsAuthorization(secretKey: string): string {
  const { verifier, challenge } = createPkcePair()
  saveSndsConnection({
    pendingVerifierEncrypted: encryptSecret(verifier, secretKey),
    pendingCreatedAt: new Date(),
  })
  return buildSndsAuthorizeUrl(challenge)
}
