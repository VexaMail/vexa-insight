#!/usr/bin/env tsx
/**
 * Vexa Mail Insight - offline AI prompt eval entrypoint.
 *
 * Runs a production prompt N times on the free Claude Max lane (the Claude Code
 * OAuth token in the macOS Keychain) against real rows in the local database,
 * and writes one artifact under `evals/results/`. Edit the prompt, re-run, diff
 * the artifacts - no metered API key is involved at any point.
 *
 * Usage:
 *   pnpm run eval:ai report <reportId> [flags]
 *   pnpm run eval:ai diagnostics <domainId> <domainName> [flags]
 *
 * Flags:
 *   --runs <n>          samples to take (default 3)
 *   --model <id>        Anthropic model id (default claude-sonnet-5)
 *   --max-tokens <n>    default 2048 for report, 3072 for diagnostics
 *   --timeout <ms>      default 120000
 *
 * Requires macOS with Claude Code signed in. Refuses to run with
 * NODE_ENV=production.
 */
import type { AiEvalArtifact, AiEvalRunOptions } from '@/services/ai/contracts'
import { DEFAULT_EVAL_MODEL } from '@/services/ai/evals/defaultEvalModel'
import { runDiagnosticsInsightsEval } from '@/services/ai/evals/runDiagnosticsInsightsEval'
import { runReportInsightsEval } from '@/services/ai/evals/runReportInsightsEval'
import { summarizeEvalArtifact } from '@/services/ai/evals/summarizeEvalArtifact'
import { writeEvalArtifact } from '@/services/ai/evals/writeEvalArtifact'
import { readNumberFlag } from '@/utils/cli/readNumberFlag'
import { readStringFlag } from '@/utils/cli/readStringFlag'

export async function main(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('refusing to run the eval harness with NODE_ENV=production')
  }

  const argv = process.argv.slice(2)
  const [target, ...rest] = argv
  const isDiagnostics = target === 'diagnostics'

  const options: AiEvalRunOptions = {
    model: readStringFlag(argv, 'model', DEFAULT_EVAL_MODEL),
    runs: readNumberFlag(argv, 'runs', 3),
    maxTokens: readNumberFlag(argv, 'max-tokens', isDiagnostics ? 3072 : 2048),
    timeoutMs: readNumberFlag(argv, 'timeout', 120_000),
  }

  let artifact: AiEvalArtifact
  if (target === 'report') {
    const reportId = Number(rest[0])
    if (!Number.isInteger(reportId)) {
      throw new Error('usage: pnpm run eval:ai report <reportId>')
    }
    artifact = await runReportInsightsEval(reportId, options)
  } else if (isDiagnostics) {
    const domainId = Number(rest[0])
    const domainName = rest[1]
    if (!Number.isInteger(domainId) || !domainName) {
      throw new Error(
        'usage: pnpm run eval:ai diagnostics <domainId> <domainName>',
      )
    }
    artifact = await runDiagnosticsInsightsEval(domainId, domainName, options)
  } else {
    throw new Error('usage: pnpm run eval:ai <report|diagnostics> ...')
  }

  console.log(`\n${summarizeEvalArtifact(artifact)}`)
  console.log(`\nartifact: ${writeEvalArtifact(artifact)}`)
}

main().catch((err: unknown) => {
  console.error('[eval:ai] Failed:', err)
  process.exit(1)
})
