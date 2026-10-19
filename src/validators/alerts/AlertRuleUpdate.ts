import type { z } from 'zod'
import type { alertRuleUpdateSchema } from './alertRuleUpdateSchema'

export type AlertRuleUpdate = z.infer<typeof alertRuleUpdateSchema>
