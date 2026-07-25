import type { Permission, Role } from '@/types/auth'

/**
 * Maps a role to the permissions it grants. The legacy `user` role is
 * mapped to viewer-equivalent permissions so pre-RBAC accounts keep
 * working until explicitly migrated.
 *
 * Permissions are append-only. Adding one to a role does not require a
 * DB migration; rebuilding the app is enough.
 *
 * `ai:invoke` is the knob for AI cost control: it currently mirrors
 * `reports:read` exactly, so introducing it changed nobody's access. Revoke it
 * from `viewer` and/or `user` here to stop those roles from spending provider
 * quota; no other file needs to change.
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
    'ai:invoke',
  ],
  operator: [
    'settings:read',
    'imap:read',
    'imap:write',
    'imap:rotate',
    'reports:read',
    'reports:write',
    'ai:invoke',
  ],
  viewer: ['reports:read', 'ai:invoke'],
  // `user` is the DB default and the only non-admin role the app assigns,
  // so it must keep the abilities pre-RBAC accounts had. Report upload is
  // reachable from the ungated /upload page for every signed-in user, hence
  // `reports:write`. `viewer` stays strictly read-only: it is opt-in and was
  // never auto-assigned.
  user: ['reports:read', 'reports:write', 'ai:invoke'],
})
