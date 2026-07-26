/**
 * Dev-only switch for routing Anthropic calls onto the Claude Max subscription
 * OAuth token instead of the metered API key.
 *
 * Fails closed: only an explicit `development` NODE_ENV qualifies, so a
 * deployed runtime with a staging/test/unset NODE_ENV can never pick up the
 * subscription token even if the env flag leaks into its config.
 */
export function isMaxOAuthBackendEnabled(): boolean {
  return (
    process.env.LLM_BACKEND === 'max-oauth' &&
    process.env.NODE_ENV === 'development'
  )
}
