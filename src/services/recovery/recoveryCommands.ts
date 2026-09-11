import { createAdminAccount } from './createAdminAccount'
import { deleteEveryUser } from './deleteEveryUser'
import { promoteAccountToAdmin } from './promoteAccountToAdmin'
import { requireRecoveryArgs } from './requireRecoveryArgs'
import { resetAccountPassword } from './resetAccountPassword'
import { rotateEncryptionKey } from './rotateEncryptionKey'

/**
 * The recovery verbs, keyed by the name typed on the command line. Each one
 * returns the single line the entrypoint prints when it succeeds.
 */
export const recoveryCommands: Record<
  string,
  (args: string[]) => Promise<string>
> = {
  'create-admin': async (args) => {
    const [username, password] = requireRecoveryArgs(args, 2) as [
      string,
      string,
    ]
    await createAdminAccount(username, password)
    return `Admin "${username}" created.`
  },
  'reset-password': async (args) => {
    const [username, password] = requireRecoveryArgs(args, 2) as [
      string,
      string,
    ]
    await resetAccountPassword(username, password)
    return `Password for "${username}" replaced; sessions ended.`
  },
  'promote-user': async (args) => {
    const [username] = requireRecoveryArgs(args, 1) as [string]
    await promoteAccountToAdmin(username)
    return `"${username}" is now an admin.`
  },
  'rotate-key': async (args) => {
    const [newKey] = requireRecoveryArgs(args, 1) as [string]
    const moved = rotateEncryptionKey(newKey)
    return Promise.resolve(
      `${String(moved)} stored secret(s) re-encrypted. Set SECRET_KEY to the ` +
        'new value in the environment before starting the instance again; ' +
        'until then the credentials cannot be read.',
    )
  },
  'hard-reset': async (args) => {
    if (!args.includes('--confirm')) {
      throw new Error('hard-reset deletes every account; pass --confirm.')
    }
    const removed = await deleteEveryUser()
    return `${String(removed)} account(s) deleted; /install is unlocked.`
  },
}
