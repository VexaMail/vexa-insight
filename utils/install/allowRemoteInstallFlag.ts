/**
 * True when the operator has opted in to allowing the install endpoint from
 * non-loopback origins. Default-deny: keeps the bootstrap window closed unless
 * explicitly relaxed via env.
 */
export const ALLOW_REMOTE_INSTALL: boolean =
  process.env.VEXA_ALLOW_REMOTE_INSTALL === '1'
