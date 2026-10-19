import type { ButtonHTMLAttributes } from 'react'

export type IssueIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name and tooltip, naming the issue it acts on. */
  readonly label: string
  /**
   * One word shown beside the icon while the row is stacked (phone); without
   * it the button stays a 44px icon square there.
   */
  readonly shortLabel?: string
}
