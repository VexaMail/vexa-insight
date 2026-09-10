import { RECOVERY_USAGE } from '@/constants/recovery'

/**
 * Takes the first `count` arguments of a recovery command, rejecting a missing
 * or empty one with the usage text rather than letting it reach the database
 * as an empty username.
 */
export function requireRecoveryArgs(args: string[], count: number): string[] {
  const given = args.slice(0, count)
  if (given.length < count || given.some((value) => !value)) {
    throw new Error(RECOVERY_USAGE)
  }
  return given
}
