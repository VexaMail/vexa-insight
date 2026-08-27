/**
 * Whitelist for refs accepted by the apply-update API. Only proper
 * `vMAJOR.MINOR.PATCH` tags (with optional pre-release suffix) are
 * allowed — never branches, hashes, or arbitrary strings, to prevent
 * abuse of the endpoint as a generic shell pivot.
 */
export const SELF_UPDATE_REF_PATTERN = /^v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?$/
