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
  | 'audit:read'
  | 'install:write'
