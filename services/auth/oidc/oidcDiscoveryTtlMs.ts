/**
 * In-process cache TTL for `.well-known/openid-configuration` documents.
 * IdPs do not rotate endpoints often; 10 minutes keeps callbacks cheap
 * without holding stale config across a real rotation.
 */
export const OIDC_DISCOVERY_TTL_MS = 10 * 60 * 1000
