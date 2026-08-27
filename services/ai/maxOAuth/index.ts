// Dev-only Claude Max subscription backend (server-only, macOS-only).
// Routes Anthropic calls onto the Claude Code OAuth token so local prompt work
// costs nothing. See docs/ai-max-oauth-backend.md.

export { applyMaxOAuthRequestShape } from './applyMaxOAuthRequestShape'
export { CLAUDE_CODE_IDENTITY } from './claudeCodeIdentity'
export { isMaxOAuthBackendEnabled } from './isMaxOAuthBackendEnabled'
