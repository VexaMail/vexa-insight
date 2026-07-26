import type { AnthropicMessagesRequest } from '../contracts/AnthropicMessagesRequest'
import { CLAUDE_CODE_IDENTITY } from './claudeCodeIdentity'

/**
 * Rewrites a `/v1/messages` body into the shape the Max OAuth lane accepts.
 *
 * Three changes, all required rather than cosmetic:
 * - the Claude Code identity becomes the FIRST `system` block, with the real
 *   prompt kept as a second block (the lane rejects sonnet/opus otherwise);
 * - thinking is disabled explicitly, because Opus 5 and Sonnet 5 think by
 *   default and this codebase parses a single text block, not a thinking one;
 * - `temperature` is dropped, because the lane serves the Claude 5 models and
 *   those reject it outright ("`temperature` is deprecated for this model",
 *   HTTP 400).
 */
export function applyMaxOAuthRequestShape(
  request: AnthropicMessagesRequest,
): AnthropicMessagesRequest {
  const { temperature, ...rest } = request
  const systemBlocks = Array.isArray(rest.system)
    ? rest.system
    : [{ type: 'text' as const, text: rest.system }]

  return {
    ...rest,
    system: [{ type: 'text', text: CLAUDE_CODE_IDENTITY }, ...systemBlocks],
    thinking: { type: 'disabled' },
  }
}
