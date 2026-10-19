import type { GeneratorFieldValues } from './GeneratorFieldValues'

export type UseGeneratorFieldsReturn<T extends GeneratorFieldValues> = {
  readonly values: T
  readonly setField: <K extends keyof T>(key: K, value: T[K]) => void
}
