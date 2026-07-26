// Dev-only Claude Max subscription backend (server-only, macOS-only).
// Routes Anthropic calls onto the Claude Code OAuth token so local prompt work
// costs nothing. See docs/ai-max-oauth-backend.md.

export { applyMaxOAuthRequestShape } from './applyMaxOAuthRequestShape'
export { buildAnthropicAuthHeaders } from './buildAnthropicAuthHeaders'
export { CLAUDE_CODE_IDENTITY } from './claudeCodeIdentity'
export { getMaxOAuthToken } from './getMaxOAuthToken'
export { isMaxOAuthBackendEnabled } from './isMaxOAuthBackendEnabled'
export { maxOAuthRequestHeaders } from './maxOAuthRequestHeaders'
export { readKeychainSecret } from './readKeychainSecret'
export { readMaxOAuthCredentials } from './readMaxOAuthCredentials'
export { refreshMaxOAuthToken } from './refreshMaxOAuthToken'
