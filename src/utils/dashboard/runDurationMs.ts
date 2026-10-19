import type { JobRunRow } from '@/types/jobs'

/** How long a finished run took, in ms; null without a run or an end. */
export function runDurationMs(
  run: JobRunRow | null,
  completedAtMs: number | null,
): number | null {
  if (!run || completedAtMs === null) return null
  return Math.max(0, completedAtMs - run.runAt.getTime())
}
