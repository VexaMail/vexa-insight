/**
 * HKDF `info` for the admin API token. Distinct from `ENCRYPTION_KEY_INFO` so
 * the token and the AES key derived from the same `SECRET_KEY` are unrelated
 * values, and holding one says nothing about the other.
 */
export const API_TOKEN_INFO = 'admin-api-token-v1'
