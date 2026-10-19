import type { ApiReferenceGlobal } from './ApiReferenceGlobal'

export type WindowWithApiReference = Window & {
  readonly Scalar?: ApiReferenceGlobal
}
