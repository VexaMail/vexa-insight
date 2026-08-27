import { PROGRESS_MAP } from './progressMap'
import { STILL_WORKING_PATTERN } from './stillWorkingPattern'

export function parseProgressLine(
  line: string,
  lastProgress: number,
): { step: string; progress: number } | null {
  // "Still working (N) ..." increments progress gradually between 35–90
  const stillWorking = STILL_WORKING_PATTERN.exec(line)
  if (stillWorking) {
    // Increment up to at most 90, in steps of ~1–3
    const nextProgress = Math.min(90, lastProgress + 2)
    return {
      step: `Processing data (${String(stillWorking[1])} records)...`,
      progress: nextProgress,
    }
  }

  for (const entry of PROGRESS_MAP) {
    if (entry.pattern.test(line)) {
      return { step: entry.step, progress: entry.progress }
    }
  }

  return null
}
