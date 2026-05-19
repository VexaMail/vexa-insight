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
    expect(hasPermission('operator', 'users:write')).toBe(false)
    expect(hasPermission('operator', 'audit:read')).toBe(false)
  })

  it('grants viewer only reports:read', () => {
    expect(hasPermission('viewer', 'reports:read')).toBe(true)
    expect(hasPermission('viewer', 'settings:read')).toBe(false)
    expect(hasPermission('viewer', 'imap:read')).toBe(false)
  })

  it('treats legacy "user" role as viewer-equivalent', () => {
    expect(hasPermission('user', 'reports:read')).toBe(true)
    expect(hasPermission('user', 'settings:write')).toBe(false)
  })

  it('denies unknown roles by default', () => {
    expect(hasPermission('superadmin', 'reports:read')).toBe(false)
    expect(hasPermission('', 'reports:read')).toBe(false)
  })
})
