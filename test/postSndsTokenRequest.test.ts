import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * Microsoft refuses the SNDS client's code redemption when the request looks
 * like it came from a browser (AADSTS90023, triggered by an Origin header),
 * so the token request shape is pinned here.
 */
describe('postSndsTokenRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts a form with the SNDS client and scope and no Origin header', async () => {
    const fetchMock = vi.fn(async () =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            access_token: 'access-1',
            refresh_token: 'refresh-1',
          }),
          { status: 200 },
        ),
      ),
    )
    vi.stubGlobal('fetch', fetchMock)
    const { postSndsTokenRequest } = await import('@/services/snds')
    const { SNDS_CLIENT_ID, SNDS_SCOPE, SNDS_TOKEN_URL } =
      await import('@/constants/snds')

    const tokens = await postSndsTokenRequest({
      grant_type: 'authorization_code',
      code: 'code-1',
      redirect_uri: 'http://localhost',
      code_verifier: 'verifier-1',
    })

    expect(tokens).toEqual({
      accessToken: 'access-1',
      refreshToken: 'refresh-1',
    })
    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ]
    expect(url).toBe(SNDS_TOKEN_URL)
    expect(init.method).toBe('POST')
    const headers = new Headers(init.headers)
    expect(headers.get('origin')).toBeNull()
    expect(headers.get('content-type')).toBe(
      'application/x-www-form-urlencoded',
    )
    const form = new URLSearchParams(init.body as string)
    expect(form.get('client_id')).toBe(SNDS_CLIENT_ID)
    expect(form.get('scope')).toBe(SNDS_SCOPE)
    expect(form.get('grant_type')).toBe('authorization_code')
    expect(form.get('code')).toBe('code-1')
    expect(form.get('code_verifier')).toBe('verifier-1')
  })

  it('surfaces the first line of the Microsoft error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        Promise.resolve(
          new Response(
            JSON.stringify({
              error: 'invalid_grant',
              error_description:
                'AADSTS70000: The code has expired.\nTrace ID: x',
            }),
            { status: 400 },
          ),
        ),
      ),
    )
    const { postSndsTokenRequest } = await import('@/services/snds')
    await expect(
      postSndsTokenRequest({ grant_type: 'refresh_token', refresh_token: 'r' }),
    ).rejects.toThrow(
      'Microsoft sign-in failed: AADSTS70000: The code has expired.',
    )
  })
})
