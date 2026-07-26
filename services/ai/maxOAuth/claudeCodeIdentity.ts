/**
 * The identity line the Max OAuth lane expects as the FIRST `system` block.
 * The lane only serves requests that present themselves as Claude Code; a
 * distinct block is required, string concatenation does not satisfy the check.
 */
export const CLAUDE_CODE_IDENTITY =
  "You are Claude Code, Anthropic's official CLI for Claude." as const
