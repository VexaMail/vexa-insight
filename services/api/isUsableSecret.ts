import { PLACEHOLDER_SECRET } from '@/services/install/placeholderSecret'
import { MIN_SECRET_LENGTH } from './minSecretLength'

export function isUsableSecret(secret: string | null | undefined): boolean {
  if (!secret) return false
  if (secret === PLACEHOLDER_SECRET) return false
  if (secret.length < MIN_SECRET_LENGTH) return false
  return true
}
