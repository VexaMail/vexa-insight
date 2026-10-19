import type { ReactNode } from 'react'

export type PageHeaderProps = {
  /** Optional group label; list pages leave it out (the breadcrumb says it). */
  readonly eyebrow?: ReactNode
  readonly title: ReactNode
  /** One sentence: what the page lists and over which window. */
  readonly description?: ReactNode
  /** At most one primary button; the rest outline or ghost. */
  readonly actions?: ReactNode
  /** The date-range picker, always first on the right. */
  readonly period?: ReactNode
  /** Extra facts under the description. */
  readonly meta?: ReactNode
}
