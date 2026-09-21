import type { IpFilterOption } from '@/types/ips'

export const ipDispositionOptions: IpFilterOption[] = [
  { value: 'none', label: 'none' },
  { value: 'quarantine', label: 'quarantine' },
  { value: 'reject', label: 'reject' },
]
