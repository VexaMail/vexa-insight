/**
 * Runs on Next.js server startup (Node.js runtime only).
 * Runs DB migrations, then starts the background jobs scheduler.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  // Fail-fast environment validation. Throws on invalid env with a clear
  // Zod error before any other module loads.
  await import('@/lib/env')

  const { runMigrations } = await import('@/lib/db')
  runMigrations()

  const { getOrCreateInstallToken, isInstalled } =
    await import('@/services/install')
  const installed = isInstalled()
  if (!installed) {
    const token = getOrCreateInstallToken()
    if (token) {
      console.warn(
        '\n========================================\n' +
          `Vexa first-run install token:\n  ${token}\n` +
          "Pass this token to POST /api/install via the 'x-install-token'\n" +
          "header or the 'installToken' body field. Re-displayed on every\n" +
          'boot until installation completes.\n' +
          '========================================\n',
      )
    }
  }

  if (installed) {
    const { encryptLegacyImapPasswords } = await import('@/services/settings')
    try {
      const { migrated } = encryptLegacyImapPasswords()
      if (migrated > 0) {
        console.info(
          `[crypto] migrated ${String(migrated)} legacy IMAP passwords to v1 encryption`,
        )
      }
    } catch (err) {
      console.warn('[crypto] failed to migrate legacy IMAP passwords', err)
    }
  }

  const { startScheduler, reportSchedulerStartFailure } =
    await import('@/services/job')
  try {
    startScheduler()
  } catch (err) {
    reportSchedulerStartFailure(err)
  }

  const { startUpdateCheckScheduler } = await import('@/services/updates')
  try {
    startUpdateCheckScheduler()
  } catch (err) {
    console.warn('[update-check] failed to start scheduler', err)
  }
}
