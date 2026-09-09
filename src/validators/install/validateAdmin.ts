import { isString } from '../../utils/install/isString'

export function validateAdmin(
  o: Record<string, unknown>,
): { adminEmail: string; adminPassword: string } | { error: string } {
  const adminEmail = o['adminEmail']
  if (!isString(adminEmail) || adminEmail.trim().length === 0) {
    return { error: 'adminEmail is required' }
  }
  const adminPassword = o['adminPassword']
  if (!isString(adminPassword) || adminPassword.trim().length === 0) {
    return { error: 'adminPassword is required' }
  }
  return { adminEmail: adminEmail.trim(), adminPassword }
}
