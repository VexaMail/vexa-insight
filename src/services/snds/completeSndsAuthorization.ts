import { SNDS_PENDING_TTL_MS, SNDS_REDIRECT_URI } from '@/constants/snds'
import { decryptSecret, encryptSecret } from '@/services/crypto'
import { extractSndsAuthCode } from '@/utils/snds'
import { getSndsConnectionRow } from './getSndsConnectionRow'
import { postSndsTokenRequest } from './postSndsTokenRequest'
import { saveSndsConnection } from './saveSndsConnection'

/**
 * Finishes connecting SNDS from the pasted redirect address: redeems the code
 * against the pending PKCE verifier and stores the refresh token encrypted.
 * Microsoft codes are short-lived, so this runs as soon as it is pasted.
 */
export async function completeSndsAuthorization(
  pasted: string,
  secretKey: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = extractSndsAuthCode(pasted)
  if ('error' in parsed) return { ok: false, error: parsed.error }

  const row = getSndsConnectionRow()
  const startedAt = row?.pendingCreatedAt?.getTime() ?? 0
  if (
    !row?.pendingVerifierEncrypted ||
    Date.now() - startedAt > SNDS_PENDING_TTL_MS
  ) {
    return {
      ok: false,
      error: 'No sign-in in progress, or it expired. Start again.',
    }
  }

  try {
    const tokens = await postSndsTokenRequest({
      grant_type: 'authorization_code',
      code: parsed.code,
      redirect_uri: SNDS_REDIRECT_URI,
      code_verifier: decryptSecret(row.pendingVerifierEncrypted, secretKey),
    })
    saveSndsConnection({
      refreshTokenEncrypted: encryptSecret(tokens.refreshToken, secretKey),
      pendingVerifierEncrypted: null,
      pendingCreatedAt: null,
      connectedAt: new Date(),
      lastSyncError: null,
    })
    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}
