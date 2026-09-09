import type { UpdateStateColumns } from './UpdateStateColumns'

export type UpdateStatePatch = UpdateStateColumns & { updatedAt: Date }
