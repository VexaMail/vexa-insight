import type { ApiReferenceOptions } from './ApiReferenceOptions'

/** What the API reference viewer's browser bundle puts on `window`. */
export type ApiReferenceGlobal = {
  readonly createApiReference: (
    selector: string,
    options: ApiReferenceOptions,
  ) => unknown
}
