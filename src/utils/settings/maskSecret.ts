/** Hides a secret behind dots, keeping its last four characters to recognise it. */
export function maskSecret(secret: string): string {
  if (secret.length <= 4) return '•'.repeat(secret.length)
  return `${'•'.repeat(12)}${secret.slice(-4)}`
}
