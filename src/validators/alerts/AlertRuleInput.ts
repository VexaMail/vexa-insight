import type { z } from 'zod'
import type { alertRuleInputSchema } from './alertRuleInputSchema'

export type AlertRuleInput = z.infer<typeof alertRuleInputSchema>
