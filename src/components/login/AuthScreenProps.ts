import type { ReactNode } from 'react'

export type AuthScreenProps = {
  /** Small mono label above the title, such as "Sign in" or "Setup". */
  readonly eyebrow: string
  readonly title: string
  readonly description: ReactNode
  /** `wide` for the installer form, `narrow` for sign-in. */
  readonly width?: 'narrow' | 'wide'
  readonly children: ReactNode
}
