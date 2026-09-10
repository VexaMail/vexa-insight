import { RECOVERY_USAGE } from '@/constants/recovery'
import { recoveryCommands } from './recoveryCommands'

/**
 * Runs one recovery command and returns the line to print. Throws with the
 * usage text when the command is not recognised, so the entrypoint stays a
 * thin wrapper around this.
 */
export async function runRecoveryCommand(argv: string[]): Promise<string> {
  const [command, ...args] = argv
  const handler = command ? recoveryCommands[command] : undefined
  if (!handler) throw new Error(RECOVERY_USAGE)
  return handler(args)
}
