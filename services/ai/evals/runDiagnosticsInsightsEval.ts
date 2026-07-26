import type { AiEvalArtifact, AiEvalRun, AiEvalRunOptions } from '../contracts'
import { buildDiagnosticsAnalysisPrompt } from '../prompts/buildDiagnosticsAnalysisPrompt'
import { buildDiagnosticsAnalysisInput } from '../use-cases/buildDiagnosticsAnalysisInput'
import { parseDiagnosticsInsightsFromContent } from '../use-cases/parseDiagnosticsInsightsFromContent'
import { runOneEvalCall } from './runOneEvalCall'

/**
 * Runs the domain-diagnostics prompt N times against a real local domain.
 *
 * Shares `buildDiagnosticsAnalysisInput` with the runtime orchestrator, so the
 * model sees exactly the DNS, stats and report picture production would send.
 * The rollout plan is not parsed here — `parseDiagnosticsInsightsFromContent`
 * is the parser that decides whether a response is usable at all, and the raw
 * content is kept in the artifact for anything else worth inspecting.
 */
export async function runDiagnosticsInsightsEval(
  domainId: number,
  domainName: string,
  options: AiEvalRunOptions,
): Promise<AiEvalArtifact> {
  const input = await buildDiagnosticsAnalysisInput({ domainId, domainName })
  const { systemPrompt, userPrompt } = buildDiagnosticsAnalysisPrompt(input)

  const runs: AiEvalRun[] = []
  for (let run = 1; run <= options.runs; run += 1) {
    runs.push(
      await runOneEvalCall(
        run,
        {
          model: options.model,
          systemPrompt,
          userPrompt,
          maxTokens: options.maxTokens,
          timeoutMs: options.timeoutMs,
        },
        parseDiagnosticsInsightsFromContent,
      ),
    )
  }

  return {
    target: `diagnostics-${domainName}`,
    generatedAt: new Date().toISOString(),
    systemPrompt,
    userPrompt,
    options,
    runs,
  }
}
