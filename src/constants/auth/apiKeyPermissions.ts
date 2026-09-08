import type { Permission } from '@/types/auth'

/**
 * Permissions granted to a request authenticated with the shared
 * `SECRET_KEY` (see `services/credentials/hasValidApiKey.ts`).
 *
 * The key is a single secret shared by every automation client, so it is
 * deliberately NOT the `admin` role: it can move report data and read
 * configuration, but it cannot create or modify users, change their roles, or
 * read the audit log. That keeps a leaked key from escalating into account
 * takeover or covering its own tracks.
 *
 * Domain scoping is unaffected: a valid key stays unrestricted in
 * `getAllowedDomainIds`, otherwise every domain-scoped query returns nothing
 * to API callers.
 *
 * Routes gated by `requireAdminAuth` (IMAP, GeoIP, admin settings) check the
 * raw key directly and are not affected by this list.
 */
export const API_KEY_PERMISSIONS: ReadonlyArray<Permission> = Object.freeze([
  'reports:read',
  'reports:write',
  'settings:read',
  'ai:invoke',
])
