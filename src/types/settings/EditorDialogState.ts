import type { Dispatch, SetStateAction } from 'react'

/** State of a create/edit dialog over one form shape. */
export type EditorDialogState<F, T> = {
  readonly open: boolean
  /** Id of the item being edited; null while creating. */
  readonly editingId: number | null
  readonly form: F
  readonly setForm: Dispatch<SetStateAction<F>>
  readonly saving: boolean
  readonly error: string | null
  readonly openCreate: () => void
  readonly openEdit: (item: T) => void
  readonly close: () => void
  readonly submit: () => Promise<void>
}
