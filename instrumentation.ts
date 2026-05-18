/**
 * Runs on Next.js server startup (Node.js runtime only).
 * Runs DB migrations, then starts the background jobs scheduler.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { runMigrations } = await import('@/lib/db')
  runMigrations()

  const { startScheduler } = await import('@/services/job')
  try {
    startScheduler()
  } catch {
    // Not installed yet (no app_settings row or secret_key still CHANGE_ME); skip scheduler
  }

  const { startUpdateCheckScheduler } = await import('@/services/updates')
  try {
    startUpdateCheckScheduler()
  } catch (err) {
    console.warn('[update-check] failed to start scheduler', err)
  }
}
