import { getDb, sndsConnection } from '@/lib/db'
import type { SndsConnectionPatch } from '@/types/snds'
import { eq } from 'drizzle-orm'
import { reencryptSndsSecret } from './reencryptSndsSecret'

/**
 * Moves the SNDS refresh token and any pending PKCE verifier onto a new
 * instance key. Returns how many secrets moved.
 */
export function reencryptSndsSecrets(
  oldSecretKey: string,
  newSecretKey: string,
): number {
  const db = getDb()
  let moved = 0
  for (const row of db.select().from(sndsConnection).all()) {
    const refresh = reencryptSndsSecret(
      row.refreshTokenEncrypted,
      oldSecretKey,
      newSecretKey,
    )
    const verifier = reencryptSndsSecret(
      row.pendingVerifierEncrypted,
      oldSecretKey,
      newSecretKey,
    )
    const patch: SndsConnectionPatch = {
      ...(refresh === undefined ? {} : { refreshTokenEncrypted: refresh }),
      ...(verifier === undefined ? {} : { pendingVerifierEncrypted: verifier }),
    }
    const count = Object.keys(patch).length
    if (count === 0) continue
    db.update(sndsConnection)
      .set(patch)
      .where(eq(sndsConnection.id, row.id))
      .run()
    moved += count
  }
  return moved
}
