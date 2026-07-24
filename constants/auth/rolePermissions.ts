import type { Permission, Role } from '@/types/auth'

/**
 * Maps a role to the permissions it grants. The legacy `user` role is
 * mapped to viewer-equivalent permissions so pre-RBAC accounts keep
 * working until explicitly migrated.
 *
 * Permissions are append-only. Adding one to a role does not require a
 * DB migration; rebuilding the app is enough.
 */
export const ROLE_PERMISSIONS: Readonly<
  Record<Role, ReadonlyArray<Permission>>
> = Object.freeze({
  admin: [
    'users:read',
    'users:write',
    'settings:read',
    'settings:write',
    'imap:read',
    'imap:write',
    'imap:rotate',
    'reports:read',
    'reports:write',
    'audit:read',
    'install:write',
  ],
  operator: [
    'settings:read',
    'imap:read',
    'imap:write',
    'imap:rotate',
    'reports:read',
    'reports:write',
  ],
  viewer: ['reports:read'],
  // `user` is the DB default and the only non-admin role the app assigns,
  // so it must keep the abilities pre-RBAC accounts had. Report upload is
  // reachable from the ungated /upload page for every signed-in user, hence
  // `reports:write`. `viewer` stays strictly read-only: it is opt-in and was
  // never auto-assigned.
  user: ['reports:read', 'reports:write'],
})
