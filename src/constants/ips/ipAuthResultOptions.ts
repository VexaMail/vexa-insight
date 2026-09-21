import type { IpFilterOption } from '@/types/ips'

export const ipAuthResultOptions: IpFilterOption[] = [
  { value: 'pass', label: 'pass' },
  { value: 'fail', label: 'fail' },
  { value: 'softfail', label: 'softfail' },
  { value: 'neutral', label: 'neutral' },
  { value: 'none', label: 'none' },
  { value: 'temperror', label: 'temperror' },
  { value: 'permerror', label: 'permerror' },
]
