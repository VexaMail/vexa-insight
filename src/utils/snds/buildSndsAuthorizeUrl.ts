import {
  SNDS_AUTHORIZE_URL,
  SNDS_CLIENT_ID,
  SNDS_REDIRECT_URI,
  SNDS_SCOPE,
} from '@/constants/snds'

/** The Microsoft sign-in URL for the SNDS client, bound to a PKCE challenge. */
export function buildSndsAuthorizeUrl(challenge: string): string {
  const params = new URLSearchParams({
    client_id: SNDS_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SNDS_REDIRECT_URI,
    scope: SNDS_SCOPE,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    prompt: 'select_account',
  })
  return `${SNDS_AUTHORIZE_URL}?${params.toString()}`
}
