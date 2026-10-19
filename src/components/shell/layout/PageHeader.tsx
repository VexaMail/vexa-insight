import { PageEyebrow } from './PageEyebrow'
import type { PageHeaderProps } from './PageHeaderProps'

/**
 * The top of every list page: title and description on the left, the period
 * picker and the page's actions on the right, bottom-aligned with the title
 * block. The shell renders the breadcrumb above it.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  period,
  meta,
}: Readonly<PageHeaderProps>) {
  const hasControls = actions !== undefined || period !== undefined
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0 space-y-2">
        {eyebrow ? <PageEyebrow>{eyebrow}</PageEyebrow> : null}
        <h1 className="text-foreground font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground max-w-2xl text-sm">
            {description}
          </p>
        ) : null}
        {meta}
      </div>
      {hasControls ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2 md:justify-end">
          {period}
          {actions}
        </div>
      ) : null}
    </header>
  )
}
