import { MIN_SECRET_LENGTH, PLACEHOLDER_SECRET } from '@/constants/auth'

export function isUsableSecret(secret: string | null | undefined): boolean {
  if (!secret) return false
  if (secret === PLACEHOLDER_SECRET) return false
  if (secret.length < MIN_SECRET_LENGTH) return false
  return true
}
