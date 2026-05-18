#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - demo seed entrypoint.
 *
 * Usage:
 *   pnpm run seed:demo            # idempotent; skips if already seeded
 *   pnpm run seed:demo --force    # wipe demo rows and reseed
 *
 * Safety: refuses to run with NODE_ENV=production unless
 * VEXA_FORCE_SEED_DEMO=1 is set. Only touches rows with the `demo-`
 * report-id prefix.
 */
import { runSeedDemo } from '@/services/seed'

export async function main(): Promise<void> {
  const force = process.argv.includes('--force')
  const summary = await runSeedDemo({ force })
  if (!summary) return
  console.log('[seed:demo] Done.')
  console.log(JSON.stringify(summary, null, 2))
  console.log(
    '\nNext steps:\n  pnpm dev\n  open http://localhost:3000 and sign in.\n',
  )
}

main().catch((err: unknown) => {
  console.error('[seed:demo] Failed:', err)
  process.exit(1)
})
