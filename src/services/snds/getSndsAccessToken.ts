import { decryptSecret, encryptSecret } from '@/services/crypto'
import { getSndsConnectionRow } from './getSndsConnectionRow'
import { postSndsTokenRequest } from './postSndsTokenRequest'
import { saveSndsConnection } from './saveSndsConnection'

/**
 * Exchanges the stored refresh token for an access token. Microsoft returns a
 * new refresh token each time and the old one stops being the one to keep, so
 * it is stored before the access token is used.
 */
export async function getSndsAccessToken(secretKey: string): Promise<string> {
  const row = getSndsConnectionRow()
  if (!row?.refreshTokenEncrypted) throw new Error('SNDS is not connected.')
  const tokens = await postSndsTokenRequest({
    grant_type: 'refresh_token',
    refresh_token: decryptSecret(row.refreshTokenEncrypted, secretKey),
  })
  saveSndsConnection({
    refreshTokenEncrypted: encryptSecret(tokens.refreshToken, secretKey),
  })
  return tokens.accessToken
}
