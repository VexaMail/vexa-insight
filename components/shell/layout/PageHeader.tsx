import { PageEyebrow } from './PageEyebrow'
import type { PageHeaderProps } from './PageHeaderProps'

export function PageHeader({
  eyebrow,
  title,
  description,
  back,
  actions,
  meta,
}: Readonly<PageHeaderProps>) {
  const hasTopRow = back !== undefined || actions !== undefined

  return (
    <header className="space-y-5">
      {hasTopRow ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">{back}</div>
          {actions}
        </div>
      ) : null}

      <div className="space-y-3">
        {eyebrow ? <PageEyebrow>{eyebrow}</PageEyebrow> : null}
        <h1 className="text-foreground font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground max-w-2xl text-sm">
            {description}
          </p>
        ) : null}
        {meta}
      </div>
    </header>
  )
}
