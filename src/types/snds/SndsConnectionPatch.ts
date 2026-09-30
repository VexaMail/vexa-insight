import type { sndsConnection } from '@/lib/db'

/** Writable fields of the SNDS connection row. */
export type SndsConnectionPatch = Partial<
  Omit<typeof sndsConnection.$inferInsert, 'id' | 'updatedAt'>
>
