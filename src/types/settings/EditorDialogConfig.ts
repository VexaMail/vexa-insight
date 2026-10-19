import type { AdminApiResult } from './AdminApiResult'

/** What a create/edit dialog needs to know about its collection. */
export type EditorDialogConfig<F, T> = {
  readonly basePath: string
  readonly emptyForm: F
  readonly toForm: (item: T) => F
  /** The request body, or a message when a field is invalid. */
  readonly toPayload: (form: F, editing: boolean) => AdminApiResult<unknown>
  readonly onSaved: () => Promise<void>
}
