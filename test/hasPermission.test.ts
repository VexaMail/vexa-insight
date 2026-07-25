import { hasPermission } from '@/utils/auth'
import { describe, expect, it } from 'vitest'

describe('hasPermission', () => {
  it('grants admin every defined permission', () => {
    expect(hasPermission('admin', 'users:write')).toBe(true)
    expect(hasPermission('admin', 'audit:read')).toBe(true)
    expect(hasPermission('admin', 'install:write')).toBe(true)
  })

  it('grants operator IMAP/settings/reports but not user management', () => {
    expect(hasPermission('operator', 'imap:rotate')).toBe(true)
    expect(hasPermission('operator', 'settings:read')).toBe(true)
    expect(hasPermission('operator', 'reports:read')).toBe(true)
    expect(hasPermission('operator', 'reports:write')).toBe(true)
    expect(hasPermission('operator', 'users:write')).toBe(false)
    expect(hasPermission('operator', 'audit:read')).toBe(false)
  })

  it('grants viewer only reports:read', () => {
    expect(hasPermission('viewer', 'reports:read')).toBe(true)
    expect(hasPermission('viewer', 'reports:write')).toBe(false)
    expect(hasPermission('viewer', 'settings:read')).toBe(false)
    expect(hasPermission('viewer', 'imap:read')).toBe(false)
  })

  it('lets the legacy "user" role read and ingest reports', () => {
    expect(hasPermission('user', 'reports:read')).toBe(true)
    // The /upload page is not role-gated, so the default role must keep
    // the ingest ability it had before RBAC landed.
    expect(hasPermission('user', 'reports:write')).toBe(true)
  })

  it('denies the legacy "user" role administrative permissions', () => {
    expect(hasPermission('user', 'settings:write')).toBe(false)
    expect(hasPermission('user', 'users:write')).toBe(false)
    expect(hasPermission('user', 'audit:read')).toBe(false)
  })

  it('grants ai:invoke to exactly the roles that can read reports', () => {
    // Introducing ai:invoke must not have changed anyone's access; it exists so
    // AI spend can be revoked per role without touching the routes.
    for (const role of ['admin', 'operator', 'viewer', 'user']) {
      expect(hasPermission(role, 'ai:invoke')).toBe(
        hasPermission(role, 'reports:read'),
      )
    }
    expect(hasPermission('superadmin', 'ai:invoke')).toBe(false)
  })

  it('denies unknown roles by default', () => {
    expect(hasPermission('superadmin', 'reports:read')).toBe(false)
    expect(hasPermission('', 'reports:read')).toBe(false)
  })
})
