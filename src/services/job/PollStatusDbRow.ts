import type { pollStatus } from '@/lib/db'

export type PollStatusDbRow = typeof pollStatus.$inferSelect
