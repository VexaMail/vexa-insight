import type { EnvironmentType } from './EnvironmentType'

export type EnvironmentSelectProps = {
  readonly value: EnvironmentType
  readonly onChange: (value: EnvironmentType) => void
}
