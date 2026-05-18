import type { InstallMethod } from './InstallMethod'
import type { SupervisorKind } from './SupervisorKind'

export type SelfUpdateCapability = {
  readonly canApply: boolean
  readonly installMethod: InstallMethod
  readonly supervisor: SupervisorKind
  readonly gitCheckout: boolean
  readonly reasons: readonly string[]
}
