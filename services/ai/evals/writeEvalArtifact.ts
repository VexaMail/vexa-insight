import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { AiEvalArtifact } from '../contracts'
import { EVAL_RESULTS_DIR } from './evalResultsDir'

/**
 * Writes one artifact and returns its path. Named by timestamp and target so a
 * sweep never overwrites the run it is being compared against.
 */
export function writeEvalArtifact(artifact: AiEvalArtifact): string {
  mkdirSync(EVAL_RESULTS_DIR, { recursive: true })
  const stamp = artifact.generatedAt.replace(/[:.]/g, '-')
  const slug = artifact.target.replace(/[^a-zA-Z0-9]+/g, '-')
  const path = join(EVAL_RESULTS_DIR, `${stamp}-${slug}.json`)
  writeFileSync(path, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8')
  return path
}
