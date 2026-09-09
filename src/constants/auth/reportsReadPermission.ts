import type { Permission } from '@/types/auth'

/**
 * The permission every role that sees reports carries; `ai:invoke` mirrors it.
 */
export const REPORTS_READ_PERMISSION: Permission = 'reports:read'
