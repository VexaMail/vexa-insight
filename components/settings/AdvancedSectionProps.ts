import type { EnvironmentType } from './EnvironmentType'

export type AdvancedSectionProps = {
  corsOrigins: string
  environment: EnvironmentType
  onCorsChange: (value: string) => void
  onEnvironmentChange: (value: EnvironmentType) => void
}
