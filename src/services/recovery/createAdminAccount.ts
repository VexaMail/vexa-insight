import { findUserByUsername } from '@/services/auth'
import { createUser } from '@/services/users'

/**
 * Creates an administrator account from the CLI, for the deployments that have
 * no SMTP and therefore no email-based recovery. Refuses to overwrite an
 * existing username: replacing a password is `resetAccountPassword`.
 */
export async function createAdminAccount(
  username: string,
  password: string,
): Promise<string> {
  if (findUserByUsername(username)) {
    throw new Error(`User "${username}" already exists.`)
  }
  const { id } = await createUser({ username, password, role: 'admin' })
  return id
}
