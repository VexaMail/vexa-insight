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
    'audit:read',
    'install:write',
  ],
  operator: [
    'settings:read',
    'imap:read',
    'imap:write',
    'imap:rotate',
    'reports:read',
  ],
  viewer: ['reports:read'],
  user: ['reports:read'],
})
