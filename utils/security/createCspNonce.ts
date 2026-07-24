export function createCspNonce(): string {
  return btoa(crypto.randomUUID())
}
