import {
  SELF_UPDATE_LOG_PATH,
  SELF_UPDATE_LOG_TAIL_LINES,
  SELF_UPDATE_RUNNING_STALE_MS,
} from '@/constants/updates'
import type { SelfUpdateLogTail } from '@/types/updates'
import fs from 'node:fs'

/**
 * Read the tail of the self-update log so the UI can show recent
 * progress. `running` is a heuristic: the log was touched recently and
 * the last line is not a "succeeded"/"ERROR" terminator.
 */
export function readSelfUpdateLog(): SelfUpdateLogTail {
  try {
    const stat = fs.statSync(SELF_UPDATE_LOG_PATH)
    const raw = fs.readFileSync(SELF_UPDATE_LOG_PATH, 'utf8')
    const allLines = raw.split('\n')
    const lines = allLines
      .slice(-SELF_UPDATE_LOG_TAIL_LINES)
      .filter((line) => line.length > 0)
    const last = lines.at(-1) ?? ''
    const isTerminated =
      last.includes('self-update succeeded') || last.startsWith('ERROR')
    const ageMs = Date.now() - stat.mtimeMs
    const running = !isTerminated && ageMs < SELF_UPDATE_RUNNING_STALE_MS
    return {
      lines,
      modifiedAt: stat.mtime.toISOString(),
      running,
    }
  } catch {
    return { lines: [], modifiedAt: null, running: false }
  }
}
