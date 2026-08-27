import type { AiEvalArtifact } from '../contracts'

/**
 * One console line per sample: what parsed, how long it took, what it cost in
 * tokens. Enough to see at a glance whether a prompt edit changed the shape or
 * the stability of the answer; the artifact holds the detail.
 */
export function summarizeEvalArtifact(artifact: AiEvalArtifact): string {
  const header = [
    `target: ${artifact.target}`,
    `model: ${artifact.options.model}`,
    `prompt: ${String(artifact.systemPrompt.length)} system chars, ${String(artifact.userPrompt.length)} user chars`,
  ]

  const lines = artifact.runs.map((run) => {
    const parsedCount = Array.isArray(run.parsed) ? run.parsed.length : 0
    const outcome = run.parseError
      ? `FAILED (${run.parseError})`
      : `${String(parsedCount)} parsed items`
    return `  run ${String(run.run)}: ${outcome} | ${String(run.durationMs)}ms | ${String(run.tokensUsed ?? 0)} tokens`
  })

  return [...header, ...lines].join('\n')
}
