import type { ButtonHTMLAttributes } from 'react'

export type IssueIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  readonly label: string
}
