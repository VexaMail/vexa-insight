import type { GeneratorOption } from '@/types/diagnostics'

export const mtaStsModeOptions: readonly GeneratorOption[] = [
  { value: 'testing', label: 'testing: report only' },
  { value: 'enforce', label: 'enforce: require TLS' },
  { value: 'none', label: 'none: withdraw the policy' },
]
