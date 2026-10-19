import type { GeneratorOption } from '@/types/diagnostics'

export type SelectFieldProps = {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly options: readonly GeneratorOption[]
  readonly onChange: (value: string) => void
}
