#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - event_rollup_daily backfill entrypoint.
 *
 * Usage:
 *   pnpm run backfill:rollup
 *
 * Recomputes the per-domain, per-day rollup from normalized_events. Idempotent
 * and safe to re-run. Run once after deploying the rollup, and any time you
 * suspect drift. Run while ingestion is idle (SQLite is single-writer).
 */
import { runMigrations } from '@/lib/db'
// Import the specific module, not the '@/services/reports' barrel: the barrel
// re-exports ingestParsedReport -> src/services/geoip/geoip.ts, which uses a
// top-level await that tsx (CJS output) cannot transform in a standalone script.
import { rebuildEventRollup } from '@/services/reports/rebuildEventRollup'

export async function main(): Promise<void> {
  runMigrations()
  const rows = await rebuildEventRollup()
  console.log(`[backfill:rollup] Rebuilt event_rollup_daily: ${rows} rows.`)
}

main().catch((err: unknown) => {
  console.error('[backfill:rollup] Failed:', err)
  process.exit(1)
})
