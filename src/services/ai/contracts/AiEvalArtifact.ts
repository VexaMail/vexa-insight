import type { AiEvalRun } from './AiEvalRun'
import type { AiEvalRunOptions } from './AiEvalRunOptions'

/**
 * The full record of one harness invocation, written to `evals/results/`.
 *
 * Both prompts are stored verbatim so a result stays readable after the prompt
 * source has moved on — comparing two artifacts is how a prompt edit is judged.
 */
export type AiEvalArtifact = {
  target: string
  generatedAt: string
  systemPrompt: string
  userPrompt: string
  options: AiEvalRunOptions
  runs: AiEvalRun[]
}
