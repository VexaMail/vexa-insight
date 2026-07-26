import { describeUnknownError } from '@/utils/errors'
import type { AiEvalCallParams, AiEvalRun } from '../contracts'
import { callMaxOAuthLane } from './callMaxOAuthLane'

/**
 * Runs one sample and records it, including its failure.
 *
 * Nothing throws out of here on purpose: an API error or an unparseable answer
 * is itself a result worth keeping — "this prompt returns prose 2 times out of
 * 5" is exactly the signal a prompt sweep exists to surface.
 */
export async function runOneEvalCall(
  run: number,
  params: AiEvalCallParams,
  parse: (content: string) => unknown,
): Promise<AiEvalRun> {
  try {
    const raw = await callMaxOAuthLane(params)
    const parsed = parse(raw.content)
    return {
      run,
      durationMs: raw.durationMs,
      tokensUsed: raw.tokensUsed,
      model: raw.model,
      content: raw.content,
      parsed,
      parseError: parsed === null ? 'parser returned null' : null,
    }
  } catch (error: unknown) {
    return {
      run,
      durationMs: 0,
      tokensUsed: null,
      model: params.model,
      content: '',
      parsed: null,
      parseError: describeUnknownError(error),
    }
  }
}
