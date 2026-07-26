/**
 * The headers that make `/v1/messages` accept a subscription OAuth token.
 *
 * Every field is load-bearing: the lane only serves requests that look like
 * Claude Code, and dropping the `claude-code-20250219` beta, the `x-app` marker
 * or the CLI user agent comes back as a `rate_limit_error` that has nothing to
 * do with quota. Paired with the identity system block in
 * `applyMaxOAuthRequestShape`.
 */
export function maxOAuthRequestHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'anthropic-beta': 'oauth-2025-04-20,claude-code-20250219',
    'x-app': 'cli',
    'user-agent': 'claude-cli/2.1.0 (external, cli)',
  }
}
