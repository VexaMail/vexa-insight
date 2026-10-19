import type { GeneratorOption } from '@/types/diagnostics'
import { dmarcPolicyOptions } from './dmarcPolicyOptions'

/** `inherit` leaves `sp` out, so subdomains follow `p`. */
export const dmarcSubdomainPolicyOptions: readonly GeneratorOption[] = [
  { value: 'inherit', label: 'Same as the policy' },
  ...dmarcPolicyOptions,
]
