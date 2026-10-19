import type { SpfGeneratorFields } from './SpfGeneratorFields'

/** The SPF form filled from the published record, and what it cannot hold. */
export type SpfGeneratorPrefill = {
  readonly fields: SpfGeneratorFields
  /** Published terms the generator has no field for, e.g. `a:mail.example.com`. */
  readonly unsupported: readonly string[]
}
