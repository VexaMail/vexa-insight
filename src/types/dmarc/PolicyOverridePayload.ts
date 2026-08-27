import type { PolicyOverrideType } from './PolicyOverrideType'

export type PolicyOverridePayload = {
  type: PolicyOverrideType
  comment?: string | null
}
