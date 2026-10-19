import type { GeneratorOption } from '@/types/diagnostics'

export const spfAllOptions: readonly GeneratorOption[] = [
  { value: 'softfail', label: '~all: soft-fail unlisted senders' },
  { value: 'fail', label: '-all: fail unlisted senders' },
]
