/**
 * Canonical set of RBAC permissions. New permissions are added by appending
 * to this union; never rename — values are referenced from
 * `constants/auth/rolePermissions.ts` and from per-route checks.
 */
export type Permission =
  | 'users:read'
  | 'users:write'
  | 'settings:read'
  | 'settings:write'
  | 'imap:read'
  | 'imap:write'
  | 'imap:rotate'
  | 'reports:read'
  | 'reports:write'
  | 'audit:read'
  | 'install:write'
  // Invoking an AI provider spends the operator's paid quota, so it is a
  // separate permission from reading the reports the analysis is built on.
  | 'ai:invoke'
