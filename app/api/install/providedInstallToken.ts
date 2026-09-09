/** The install token from the header, else the body field, else empty. */
export function providedInstallToken(request: Request, body: unknown): string {
  const headerToken = request.headers.get('x-install-token')
  let bodyToken = ''
  if (
    typeof body === 'object' &&
    body !== null &&
    'installToken' in body &&
    typeof body.installToken === 'string'
  ) {
    bodyToken = body.installToken
  }
  return headerToken ?? bodyToken
}
