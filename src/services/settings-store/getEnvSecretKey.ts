import { isDerivableSecret } from '@/utils/auth'

/**
 * The root secret supplied by the deployment environment, or null when the
 * environment does not carry a usable one.
 *
 * This is the preferred home for the key: a value that lives only here never
 * ends up inside the database it is meant to protect.
 */
export function getEnvSecretKey(): string | null {
  const value = process.env['SECRET_KEY']?.trim()
  return isDerivableSecret(value) ? (value as string) : null
}
