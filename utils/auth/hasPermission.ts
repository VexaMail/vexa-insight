import { ROLE_PERMISSIONS } from '@/constants/auth'
import type { Permission, Role } from '@/types/auth'

/**
 * Pure check: does this role grant the given permission?
 * Unknown roles (e.g. corrupt DB row, future role added without code
 * update) deny by default.
 */
export function hasPermission(role: string, permission: Permission): boolean {
  const grants = ROLE_PERMISSIONS[role as Role]
  if (!grants) return false
  return grants.includes(permission)
}
