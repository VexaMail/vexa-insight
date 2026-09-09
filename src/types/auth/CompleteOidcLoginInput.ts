export type CompleteOidcLoginInput = {
  readonly issuer: string
  readonly code: string
  readonly codeVerifier: string
}
