/**
 * One reverse proxy in front of the app unless VEXA_TRUSTED_PROXY_HOPS says
 * otherwise. Kept beside its reader rather than in `@/constants`: this folder
 * is loaded by `next.config.ts`, whose loader does not resolve the `@/` alias,
 * so everything here imports only its siblings.
 */
export const DEFAULT_TRUSTED_PROXY_HOPS = 1
