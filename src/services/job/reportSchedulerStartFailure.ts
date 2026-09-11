import { isInstalled } from '@/services/install'

/**
 * Explains why the scheduler did not start, when it matters.
 *
 * A not-yet-installed instance has no settings row and legitimately skips the
 * scheduler, so that case stays quiet. An INSTALLED instance reaches here too —
 * most often because SECRET_KEY is missing or wrong, which makes the stored
 * mailbox credentials undecryptable — and silence there is indistinguishable
 * from a healthy idle boot while ingestion never runs again.
 */
export function reportSchedulerStartFailure(error: unknown): void {
  if (!isInstalled()) return
  console.error(
    '[boot] scheduler did not start on an installed instance; ingestion and ' +
      'hostname jobs are NOT running. Most likely SECRET_KEY is missing or ' +
      'wrong: it is required to decrypt the stored mailbox credentials.',
    error,
  )
}
