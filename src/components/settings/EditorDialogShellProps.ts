import type { ReactNode } from 'react'

export type EditorDialogShellProps = {
  readonly open: boolean
  readonly title: string
  readonly description: string
  readonly error: string | null
  readonly saving: boolean
  readonly onClose: () => void
  readonly onSubmit: () => void
  readonly children: ReactNode
}
