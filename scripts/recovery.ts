#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - account recovery entrypoint.
 *
 * Usage:
 *   npx tsx scripts/recovery.ts create-admin <username> <password>
 *   npx tsx scripts/recovery.ts reset-password <username> <password>
 *   npx tsx scripts/recovery.ts promote-user <username>
 *   npx tsx scripts/recovery.ts rotate-key <new-secret-key>
 *   npx tsx scripts/recovery.ts hard-reset --confirm
 *
 * A self-hosted deployment usually has no SMTP, so there is no "email me a
 * reset link" path: recovery happens on the server, against the database named
 * by DATABASE_URL (default `file:./data/vexa.db`).
 *
 * `hard-reset` deletes every account and session, which unlocks `/install`.
 * Settings survive it; the key that decrypts stored IMAP passwords is not in
 * the database at all, it comes from `SECRET_KEY` in the environment.
 *
 * `rotate-key` re-encrypts those stored secrets under a new key. Run it with
 * the instance stopped, then set `SECRET_KEY` to the new value.
 */
import { runMigrations } from '@/lib/db'
import { runRecoveryCommand } from '@/services/recovery'

export async function main(argv: string[]): Promise<void> {
  try {
    // The app migrates on boot, but recovery is exactly the situation where
    // the app may never have started successfully.
    runMigrations()
    console.log(`[recovery] ${await runRecoveryCommand(argv)}`)
  } catch (error: unknown) {
    console.error(
      '[recovery] Failed:',
      error instanceof Error ? error.message : error,
    )
    process.exit(1)
  }
}

// tsx transpiles these entrypoints to CJS, where a top-level await is a build
// error, so the failure handling lives inside main.
void main(process.argv.slice(2))
