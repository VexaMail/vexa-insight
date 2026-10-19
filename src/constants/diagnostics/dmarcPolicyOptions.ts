import type { GeneratorOption } from '@/types/diagnostics'

export const dmarcPolicyOptions: readonly GeneratorOption[] = [
  { value: 'none', label: 'none: monitor only' },
  { value: 'quarantine', label: 'quarantine: send to spam' },
  { value: 'reject', label: 'reject: refuse' },
]
