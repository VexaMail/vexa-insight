import type { ReactNode } from 'react'

export type AuthResultPopoverProps = {
  /** The full result in words, e.g. "SPF aligned: 12 of 24 messages pass". */
  readonly detail: string
  /** The badge that opens it. */
  readonly children: ReactNode
}
