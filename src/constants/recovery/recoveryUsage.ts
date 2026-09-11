/**
 * The command list `scripts/recovery.ts` prints when it is called with
 * something it does not recognise. Kept beside the commands so the two cannot
 * drift apart.
 */
export const RECOVERY_USAGE = `Usage:
  recovery.ts create-admin <username> <password>
  recovery.ts reset-password <username> <password>
  recovery.ts promote-user <username>
  recovery.ts rotate-key <new-secret-key>
  recovery.ts hard-reset --confirm`
